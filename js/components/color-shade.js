(function colorShades(Vue){
  'use strict';

  const template = `
    <div>
      <div v-if="!skipMarkingPrimary" class="color-data text-center">{{shade.group}}</div>
      <div :style="{backgroundColor: shade.hex}" class="shade-box">
        <div
          title="Primary"
          v-if="!skipMarkingPrimary && shade.isPrimary"
          class="primary">
        </div>
      </div>
      <div class="color-data text-center">{{shade.hex}}</div>
    </div>
  `;

  const props = ['shade', 'skipMarkingPrimary'];

  Vue.component('color-shade', { template, props, /* data, methods*/ });
})(Vue);
