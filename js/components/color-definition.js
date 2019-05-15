(function colorDefinition(Vue){
  'use strict';

  const template = `
    <div class="row">
      <div class="col-md-4">
        <div class="color-definition">
          <div class="form-group">
            <label>Color Name
              <input type="text" class="form-control" v-model="color.name">
            </label>
          </div>
          <div class="form-group">
            <label>Hex Value
              <input type="text" class="form-control" v-model="color.hex">
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h2 v-if="color.name">{{color.name}}</h2>
        <div class="color-box" v-bind:style="{backgroundColor: color.hex}"></div>
      </div>
    </div>
  `;

  Vue.component('color-definition', {
    template,
    props: ['color']
  });
})(Vue);
