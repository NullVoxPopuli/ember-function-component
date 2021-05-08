import { setComponentManager } from '@ember/component';

import ComponentManager from './-private/function-manager';

export { useCallback, useEffect, useService, useState } from './-private/hooks';

setComponentManager((owner) => ComponentManager.create(owner), Function.prototype);
