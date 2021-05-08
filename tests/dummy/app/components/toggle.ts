import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';

import { useState } from 'ember-function-component';

function useToggle() {
  const [value, setValue] = useState(false);

  return { value, toggle: () => setValue(!value) };
}

export default setComponentTemplate(
  hbs`
    {{this.value}}

    <button type='button' {{on 'click' this.toggle}}>
      Toggle
    </button>
  `,
  useToggle
);
