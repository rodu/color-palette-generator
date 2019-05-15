(function colorShades(Vue){
  'use strict';

  const template = `
    <div>
      <div class="color-data text-center">{{shade.group}}</div>
      <div :style="{backgroundColor: shade.hex}" class="shade-box"></div>
      <div class="color-data text-center">{{shade.hex}}</div>
    </div>
  `;

  const props = ['shade'];

  Vue.component('color-shade', { template, props, /* data, methods*/ });
})(Vue);
