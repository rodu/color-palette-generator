(function colorItem(Vue){
  'use strict';

  const template = `
    <div class="color-item">
      <h3>{{title}}</h3>
      <div class="color-shades">
        <div
          v-for="(shade, index) in definition.shades"
          v-bind:key="shade.group">
          <color-shade
            :index="index"
            :count="definition.shades.length"
            :shade="shade">
          </color-shade>
        </div>
      </div>
      <div class="color-variables" v-if="showVariables">
        <h3>SASS variables</h3>
        <p
          v-for="variable in definition.variables"
          v-bind:key="variable.id">
          {{variable.value}}
        </p>
      </div>
    </div>
  `;

  const props = ['title', 'definition', 'showVariables'];

  Vue.component('color-item', { template, props });
})(Vue);
