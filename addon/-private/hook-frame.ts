import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

import { tracked } from 'tracked-built-ins';

import type { FunctionWrapper } from './function-wrapper';

const STACK: FunctionWrapper[] = [];

let STATE_INDEX = 0;

export function beginFrame(context: FunctionWrapper) {
  STACK.push(context);
  STATE_INDEX = 0;
}

export function endFrame() {
  return STACK.pop();
}

function COMPONENT() {
  let component = STACK[STACK.length - 1];

  assert(`Component is undefined. Perhaps it was destroyed prematurely?`, component);

  return component;
}

function STATE() {
  let state = COMPONENT().state;

  assert(`State is undefined for component. Perhaps it was destroyed prematurely?`, state);

  return state;
}

function set(state: Map<number, Tag>, index: number, value: unknown) {
  let tag = state.get(index);

  assert(`Cannot set a value which does not exist`, tag);

  tag.value = value;
}

export interface Tag<Value = unknown> {
  value: Value;
}

function getValue<Value = unknown>(state: Map<number, Tag>, value: Value) {
  let existing = state.get(STATE_INDEX);

  if (existing) {
    return existing.value as Value;
  }

  let fresh = tracked({ value });

  state.set(STATE_INDEX, fresh);

  return fresh.value as Value;
}

export function __useState<Value>(initialValue: Value): [Value, (nextValue: Value) => void] {
  const state = STATE();
  const value = getValue(state, initialValue);
  const valueIndex = STATE_INDEX;

  const update = (nextValue: Value) => {
    set(state, valueIndex, nextValue);
  };

  STATE_INDEX++;

  return [value, update];
}

export function __getOwner() {
  return getOwner(COMPONENT());
}
