import { DEBUG } from '@glimmer/env';
import { getOwner, setOwner } from '@ember/application';
import { capabilities } from '@ember/component';
import { assert } from '@ember/debug';
import { destroy, isDestroying } from '@ember/destroyable';
import { cancel, later } from '@ember/runloop';

export interface Args {
  named: Record<string, unknown>;
  positional: unknown[];
}

export type FunctionComponent = (args: Args['named']) => unknown;

class FunctionWrapper {}

export default class ComponentManager {
  capabilities = capabilities('3.13', {
    destructor: true,
    updateHook: true,
  });

  static create(owner: unknown) {
    let manager = new ComponentManager();

    setOwner(manager, owner);

    return manager;
  }

  createComponent(machine: FunctionComponent, args: Args) {
    let { named } = args;

    // setOwner(context, getOwner(this));

    return null; /* some function reference / runner */
  }

  updateComponent(wrapper: FunctionWrapper, args: Args) {
    // reinvoke the function
  }

  destroyComponent(wrapper: FunctionWrapper) {
    if (isDestroying(wrapper)) {
      return;
    }

    destroy(wrapper);
  }

  getContext(wrapper: FunctionWrapper) {
    return wrapper.lastComputed;
  }
}
