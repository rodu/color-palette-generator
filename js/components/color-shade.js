(function colorShades(Vue){
  'use strict';

  const template = `
    <div>
      <div v-if="!skipMarkingPrimary" class="color-data text-center">{{shade.group}}</div>
      <div :style="{backgroundColor: shade.hex}" class="shade-box" :class="{first, last}">
        <div
          title="Primary"
          v-if="!skipMarkingPrimary && shade.isPrimary"
          class="primary">
        </div>
      </div>
      <div class="color-data text-center">{{shade.hex}}</div>
    </div>
  `;

  const props = ['shade', 'index', 'count', 'skipMarkingPrimary'];

  const computed = {
    first(){
      return 0 === this.index;
    },

    last(){
      return this.count - 1 === this.index;
    }
  };

  Vue.component('color-shade', {
    template,
    props,
    computed,
  });
})(Vue);
