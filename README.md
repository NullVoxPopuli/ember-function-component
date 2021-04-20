ember-function-component
==============================================================================

[![CI](https://github.com/NullVoxPopuli/ember-function-component/actions/workflows/ci.yml/badge.svg)](https://github.com/NullVoxPopuli/ember-function-component/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/ember-function-component.svg)](https://www.npmjs.com/package/ember-function-component)


Use functions and hooks as components instead of classes.
...but without the "Rules of Hooks" that React has to follow ;)

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
function useToggle() {
  const [value, setValue] = useState(false);
  const toggle = useCallback(() => setValue(!value));

  return { value, toggle };
}
```
```hbs
{{this.value}}

<button type='button' {{on 'click' this.toggle}}>
  Toggle
</button>
```
`this` will be a reference to any value returned from the function

### Accessing Services

TODO

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
