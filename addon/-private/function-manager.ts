import { getOwner, setOwner } from '@ember/application';
import { capabilities } from '@ember/component';
import { destroy, isDestroying } from '@ember/destroyable';

import { FunctionWrapper } from './function-wrapper';

import type { Args, FunctionComponent } from './function-wrapper';

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

  createComponent(fn: FunctionComponent<unknown>, args: Args) {
    let wrapper = new FunctionWrapper(fn);

    setOwner(wrapper, getOwner(this));

    wrapper.update(args);

    return wrapper;
  }

  updateComponent(wrapper: FunctionWrapper<unknown>, args: Args) {
    wrapper.update(args);
  }

  destroyComponent(wrapper: FunctionWrapper<unknown>) {
    if (isDestroying(wrapper)) {
      return;
    }

    destroy(wrapper);
  }

  getContext(wrapper: FunctionWrapper<unknown>) {
    return wrapper.lastValue;
  }
}
