/* eslint-disable @typescript-eslint/no-explicit-any */
import { tracked } from '@glimmer/tracking';
import { setComponentTemplate } from '@ember/component';
import { action } from '@ember/object';
import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { useCallback, useEffect, useService, useState } from 'ember-function-component';

declare module '@ember/service' {
  interface Registry {
    // determined in tests
    'test-state': any;
    'test-service': any;
  }
}

module('Usage', function (hooks) {
  setupRenderingTest(hooks);

  module('useState', function () {
    test('it works', async function (assert) {
      /**
       * Secret: function components are actually hooks
       */
      function useToggle() {
        const [value, setValue] = useState(false);

        return { value, toggle: () => setValue(!value) };
      }

      setComponentTemplate(
        hbs`
        {{this.value}}

        <button type='button' {{on 'click' this.toggle}}>
          Toggle
        </button>
      `,
        useToggle
      );

      this.owner.register('component:toggler', useToggle);

      await render(hbs`<Toggler />`);

      assert.dom().containsText('false');

      await click('button');

      assert.dom().doesNotContainText('false');
      assert.dom().containsText('true');
    });
  });

  module('useCallback', function () {
    test('it works', async function (assert) {
      let a = 1;

      function useIncrementer() {
        const callback = useCallback(() => a++);

        return { callback };
      }

      setComponentTemplate(
        hbs`
        <button type='button' {{on 'click' this.callback}}>
          Toggle
        </button>
      `,
        useIncrementer
      );

      this.owner.register('component:foo', useIncrementer);

      await render(hbs`<Foo />`);

      assert.equal(a, 1);

      await click('button');

      assert.equal(a, 2);
      await click('button');

      assert.equal(a, 3);
    });
  });

  module('useEffect', function () {
    test('it works', async function (assert) {
      let a = 1;

      function component() {
        useEffect(() => a++);

        return {};
      }

      setComponentTemplate(hbs`Nothing to see here`, component);

      this.owner.register('component:foo', component);

      await render(hbs`<Foo />`);

      assert.equal(a, 2);
    });
  });

  module('useService', () => {
    test('it works', async function (assert) {
      class TestService extends Service {
        @tracked value = 0;

        @action
        increment() {
          this.value++;
        }
      }

      this.owner.register('service:test-service', TestService);

      function useIncrementer() {
        const testService = useService('test-service');

        return { inc: testService.increment };
      }

      setComponentTemplate(
        hbs`
        <button type='button' {{on 'click' this.inc}}>
          Inc
        </button>
      `,
        useIncrementer
      );

      this.owner.register('component:foo', useIncrementer);

      await render(hbs`<Foo />`);

      let service = this.owner.lookup('service:test-service');

      assert.equal(service.value, 0);

      await click('button');
      assert.equal(service.value, 1);

      await click('button');
      assert.equal(service.value, 2);
    });
  });
});
