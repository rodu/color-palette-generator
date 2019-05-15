(function colorDefinition(Vue, rodu, paletteGenerator){
  'use strict';

  const template = `
    <div class="row">
      <div class="col-md-2">
        <div class="color-definition">
          <div class="form-group">
            <label>Color Name
              <input type="text" class="form-control" v-model="color.name">
            </label>
          </div>
          <div class="form-group">
            <label>Hex Value
              <input type="text" class="form-control" v-model="color.hex" @input="onColorChange()">
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <h2 v-if="color.name">{{color.name}}</h2>
        <div class="color-box" :style="{backgroundColor: color.hex}"></div>
        <div v-if="color.primary">
          <h3>PRIMARY</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.primary.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
        <div v-if="color.analogus">
          <h3>ANALOGUS</h3>
          <div
            class="color-shades"
            v-for="analogus in color.analogus"
            v-bind:key="analogus.id">
            <color-shade
              v-for="shade in analogus.shades"
              v-bind:key="shade.group"
              :shade="shade">
            </color-shade>
          </div>
        </div>
        <div v-if="color.complementary">
          <h3>COMPLEMENTARY</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.complementary.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
        <div v-if="color.triadic">
          <h3>TRIADIC</h3>
          <div
            class="color-shades"
            v-for="triadic in color.triadic"
            v-bind:key="triadic.id">
            <color-shade
              v-for="shade in triadic.shades"
              v-bind:key="shade.group"
              :shade="shade">
            </color-shade>
          </div>
        </div>
      </div>
    </div>
  `;

  const props = ['initialColor'];

  const getColorScale = (hex) => {
    const shades = paletteGenerator.default.getPalette(hex);

    return Object.keys(shades).reverse().map((key) => shades[key]);
  };
  const addShades = (color) => {
    if (color && color.hex) {
      if (color.hex.length === 7) {
        const similarColors = paletteGenerator.default.getSimilar(color.hex);

        color.analogus = similarColors.analogus.map((analogus) => ({
          id: rodu.generateId(),
          shades: getColorScale(analogus.hex)
        }));

        color.complementary = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.complementary.hex)
        };

        color.primary = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.primary.hex)
        };

        color.triadic = similarColors.triadic.map((triadic) => ({
          id: rodu.generateId(),
          shades: getColorScale(triadic.hex)
        }));
      }
    }

    return color;
  };

  const data = function() {
    return {
      color: addShades(this.initialColor)
    };
  };

  const methods = {
    onColorChange: function() {
      addShades(this.color);
    }
  };

  Vue.component('color-definition', { template, props, data, methods });
})(Vue, rodu, paletteGenerator);
