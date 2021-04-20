import { setComponentTemplate } from '@ember/component';
import Service from '@ember/service';
import { clearRender, render } from '@ember/test-helpers';
import click from '@ember/test-helpers/dom/click';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { getService, useCallback, useState } from 'ember-function-component';

declare module '@ember/service' {
  interface Registry {
    'test-state': any; // determined in tests
  }
}

module('Usage', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    /**
     * Secret: function components are actually hooks
     */
    function useToggle() {
      const [value, setValue] = useState(false);
      const toggle = useCallback(() => setValue(!value));

      return { value, toggle };
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

    assert.dom().containsText('inactive');

    await click('button');

    assert.dom().doesNotContainText('inactive');
    assert.dom().containsText('active');
  });
});
