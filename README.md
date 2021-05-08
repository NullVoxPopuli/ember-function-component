ember-function-component
==============================================================================

[![CI](https://github.com/NullVoxPopuli/ember-function-component/actions/workflows/ci.yml/badge.svg)](https://github.com/NullVoxPopuli/ember-function-component/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/ember-function-component.svg)](https://www.npmjs.com/package/ember-function-component)


Use functions and hooks as components instead of classes.
...but without dependency lists ;)

DANGER: this library is experimental and not thoroughly tested.

NOTE: mass use of function components will result in performance degradation when compared with Glimmer components

Installation
------------------------------------------------------------------------------

```bash
ember install ember-function-component
# or
npm install ember-function-component
# or
yarn add ember-function-component
```

Usage
------------------------------------------------------------------------------

Example with Ember Octane

```js
/** app/components/toggle.js
 * Secret: function components are actually hooks
 */
export default function useToggle() {
  const [value, setValue] = useState(false);
  const toggle = useCallback(() => setValue(!value));

  return { value, toggle };
}
```
```hbs
{{!-- app/components/toggle.hbs --}}
{{this.value}}

<button type='button' {{on 'click' this.toggle}}>
  Toggle
</button>
```
`this` will be a reference to any value returned from the function

### Single-File Components

The same SFC technique used with Glimmer components can be used with function components:

```js
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';

import { useState } from 'ember-function-component';

export default setComponentTemplate(
  hbs`
    {{this.value}}

    <button type='button' {{on 'click' this.toggle}}>
      Toggle
    </button>
  `,
  function useToggle() {
    const [value, setValue] = useState(false);

    return { value, toggle: () => setValue(!value) };
  }
);
```

Depending on the direction of [ember-template-imports](https://github.com/ember-template-imports/ember-template-imports/)
this syntax may be possible in the future:

```jsx
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';

import { useState } from 'ember-function-component';

export default function ToggleComponent() {
  const [value, setValue] = useState(false);
  const toggle = () => setValue(!value);

  return
    <template>
      {{value}}

      <button type='button' {{on 'click' toggle}}>
        Toggle
      </button>
    </template>
  ;
}
```

### Accessing Services

```js
import { useService } from 'ember-function-component';

export default function MyComponent() {
  let myService = useService('some-service');

  return { property: myService.something };
}
```

### API

`import * from 'ember-function-component'`:

 - `useState`
 - `useCallback`
 - `useEffect`
 - `useService`

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.25 or above
* Node.js v12 or above


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
