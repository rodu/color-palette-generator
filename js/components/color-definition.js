(function colorDefinition(Vue, rodu, paletteGenerator){
  'use strict';

  const template = `
    <div class="row">
      <div class="col-md-2">
        <div>
          <div class="form-group">
            <label>Color Name
              <input type="text" class="form-control" v-model="color.name">
            </label>
          </div>
          <div class="form-group">
            <label>Hex Value
              <input type="text" class="form-control" v-model="color.hex" @input="onColorChange()">
              <div id="color-box" class="color-box" :style="{backgroundColor: color.hex}"></div>
            </label>
          </div>
          <div>
            <!-- button @click="addColor()" title="Add Colour" class="btn btn-success">+</button -->
            <button @click="save()" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <h1 v-if="color.name">{{color.name}}</h1>
        <div class="color-shades">
          <div
            v-for="shade in color.primaries"
            v-bind:key="shade.id">
            <color-shade :shade="shade" :skip-marking-primary="true"></color-shade>
          </div>
        </div>
        <div v-if="color.primary" class="color-definition">
          <h3>PRIMARY</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.primary.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
        <div v-if="color.analogus" class="color-definition">
          <h3>ANALOGUS</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.analogus.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
        <div v-if="color.complementary" class="color-definition">
          <h3>COMPLEMENTARY</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.complementary.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
        <div v-if="color.triadic" class="color-definition">
          <h3>TRIADIC</h3>
          <div class="color-shades">
            <div
              v-for="shade in color.triadic.shades"
              v-bind:key="shade.group">
              <color-shade :shade="shade"></color-shade>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const props = ['initialColor', 'save'];

  const getColorScale = (hex) => {
    const shades = paletteGenerator.default.getPalette(hex);

    return Object.keys(shades).reverse().map((key) => shades[key]);
  };

  const isPrimary = (definition) => definition.isPrimary;

  const concatShades = (definitions) => {
    return definitions.reduce((result, definition) => {
      return result.concat(definition.shades);
    }, []);
  };

  const addShadeId = (shade) => {
    shade.id = rodu.generateId();

    return shade;
  };

  const addShades = (color) => {
    if (color && color.hex) {
      if (color.hex.length === 7) {
        const similarColors = paletteGenerator.default.getSimilar(color.hex);

        color.primary = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.primary.hex)
        };

        color.analogus = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.analogus[0].hex)
        };

        color.complementary = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.complementary.hex)
        };

        color.triadic = {
          id: rodu.generateId(),
          shades: getColorScale(similarColors.triadic[0].hex)
        };

        color.primaries = [
          color.primary.shades.find(isPrimary),
          color.analogus.shades.find(isPrimary),
          color.complementary.shades.find(isPrimary),
          color.triadic.shades.find(isPrimary),
        ].map(addShadeId);
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

  const mounted = function() {
    // Initializes the color picker
    const parent = document.getElementById('color-box');
    const picker = new Picker({
      parent,
      color: this.color.hex,
      alpha: false
    });

    picker.onChange = (color) => {
      this.color.hex = color.hex.substring(0, 7);
    };
  };

  const created = function() {
    this.$watch('color.hex', _.debounce(() => this.onColorChange(), 500));
  };

  Vue.component(
    'color-definition',
    { template, props, data, methods, mounted, created }
  );
})(Vue, rodu, paletteGenerator);
