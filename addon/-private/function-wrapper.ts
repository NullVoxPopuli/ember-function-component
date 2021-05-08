// import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import { tracked } from 'tracked-built-ins';

import { beginFrame, endFrame } from './hook-frame';

import type { Tag } from './hook-frame';
import type ApplicationInstance from '@ember/application/instance';

export interface Args {
  named: Record<string, unknown>;
  positional: unknown[];
}

export type FunctionComponent<Value = unknown> = (
  args: Args['named'],
  owner: ApplicationInstance
) => Value;

export class FunctionWrapper<Value = unknown> {
  lastValue = tracked({});

  state = new Map<number, Tag>();

  constructor(private fn: FunctionComponent<Value>) {
    registerDestructor(this, () => {
      // Free memory
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.state = undefined;
    });
  }

  update(args: Args) {
    beginFrame(this);

    let result = this.fn(args.named, getOwner(this));

    assert(
      `The return type of your component, ${this.fn.name}, must be an object.`,
      typeof result === 'object' && !Array.isArray(result)
    );

    Object.assign(this.lastValue, result);

    endFrame();
  }
}
