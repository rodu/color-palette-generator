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
            <label>Show SASS variables
              <input type="checkbox" @input="onShowVariablesChange()">
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
          <div class="color-variables" v-if="showVariables">
            <p
              v-for="variable in color.primary.variables"
              v-bind:key="variable.id">
              {{variable.value}}
            </p>
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
          <div class="color-variables" v-if="showVariables">
            <p
              v-for="variable in color.analogus.variables"
              v-bind:key="variable.id">
              {{variable.value}}
            </p>
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
          <div class="color-variables" v-if="showVariables">
            <p
              v-for="variable in color.complementary.variables"
              v-bind:key="variable.id">
              {{variable.value}}
            </p>
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
          <div class="color-variables" v-if="showVariables">
            <p
              v-for="variable in color.triadic.variables"
              v-bind:key="variable.id">
              {{variable.value}}
            </p>
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

  const scaleToVariables = function(shade) {
    return {
      id: rodu.generateId(),
      value: `$${this.name}-${shade.group}: ${shade.hex};`
    };
  };

  const addShades = (color) => {
    if (color && color.hex) {
      if (color.hex.length === 7) {
        const similarColors = paletteGenerator.default.getSimilar(color.hex);

        const primaryShades = getColorScale(similarColors.primary.hex);
        color.primary = {
          id: rodu.generateId(),
          shades: primaryShades,
          variables: primaryShades
            .reverse()
            .map(scaleToVariables, { name: 'primary' })
        };

        const analogusShades = getColorScale(similarColors.analogus[0].hex);
        color.analogus = {
          id: rodu.generateId(),
          shades: analogusShades,
          variables: analogusShades
            .reverse()
            .map(scaleToVariables, { name: 'analogus' })
        };

        const complementaryShades =
          getColorScale(similarColors.complementary.hex);
        color.complementary = {
          id: rodu.generateId(),
          shades: complementaryShades,
          variables: complementaryShades
            .reverse()
            .map(scaleToVariables, { name: 'complementary' })
        };

        const triadicShades = getColorScale(similarColors.triadic[0].hex);
        color.triadic = {
          id: rodu.generateId(),
          shades: triadicShades,
          variables: triadicShades
            .reverse()
            .map(scaleToVariables, { name: 'triadic' })
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
      color: addShades(this.initialColor),
      showVariables: false
    };
  };

  const methods = {
    onColorChange: function() {
      addShades(this.color);
    },
    onShowVariablesChange: function() {
      this.showVariables = !Boolean(this.showVariables);
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
