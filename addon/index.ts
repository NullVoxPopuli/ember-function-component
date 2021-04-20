import { getOwner } from '@ember/application';
import { setComponentManager } from '@ember/component';
import { assert } from '@ember/debug';

import ComponentManager from './-private/function-manager';

import type { Registry } from '@ember/service';

setComponentManager((owner) => ComponentManager.create(owner), Function.prototype);

export function getService<Key extends keyof Registry>(context: unknown, serviceName: Key) {
  let owner = getOwner(context);

  assert(`Expected passed context to be aware of the container (owner)`, owner);

  let service = owner.lookup(`service:${serviceName}`) as Registry[Key];

  return service;
}
