import { assert } from '@ember/debug';
import { schedule } from '@ember/runloop';

import { __getOwner, __useState } from './hook-frame';

import type { Registry } from '@ember/service';

export const useState = __useState;

type Fn<Return = unknown, Args extends Array<unknown> = unknown[]> = (
  ...args: Args
) => Return | void;

export function useCallback<Return>(callback: Fn<Return>) {
  const [value] = useState(callback);

  return value;
}

/**
 * Primitive useEffect implementation that
 * will run every time the component is re-evaluated
 *
 * TODO: add caching
 */
export function useEffect(callback: Fn) {
  schedule('afterRender', () => callback());
}

export function useService<Key extends keyof Registry>(serviceName: Key) {
  let owner = __getOwner();

  assert(`Expected passed context to be aware of the container (owner)`, owner);

  let service = owner.lookup(`service:${serviceName}`) as Registry[Key];

  return service;
}
