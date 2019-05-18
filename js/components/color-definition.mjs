import { generateId } from '../utils/generate-id.mjs';

import './color-shade.mjs';

const template = `
  <div class="row color-definition">
    <div class="col-md-12">
      <h1 class="color-name">{{color.name}}</h1>
      <div class="color-shades">
        <div
          v-for="(shade, index) in color.primaries"
          v-bind:key="shade.id">
          <color-shade
            :shade="shade"
            :index="index"
            :count="color.primaries.length"
            :skip-marking-primary="true">
          </color-shade>
        </div>
      </div>
      <color-item
        v-if="color.primary"
        :definition="color.primary"
        :showVariables="showVariables"
        title="PRIMARY">
      </color-item>
      <color-item
        v-if="color.analogus"
        :definition="color.analogus"
        :showVariables="showVariables"
        title="ANALOGUS">
      </color-item>
      <color-item
        v-if="color.complementary"
        :definition="color.complementary"
        :showVariables="showVariables"
        title="COMPLEMENTARY">
      </color-item>
      <color-item
        v-if="color.triadic"
        :definition="color.triadic"
        :showVariables="showVariables"
        title="TRIADIC">
      </color-item>
    </div>
  </div>
`;

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
  shade.id = generateId();

  return shade;
};

const scaleToVariables = function(shade) {
  return {
    id: generateId(),
    value: `$${this.name}-${shade.group}: ${shade.hex};`
  };
};

const addShades = (color) => {
  if (color && color.hex && color.hex.match(/^#[a-f0-9]{6}$/i)) {
    const similarColors = paletteGenerator.default.getSimilar(color.hex);

    const primaryShades = getColorScale(similarColors.primary.hex);
    color.primary = {
      id: generateId(),
      shades: primaryShades,
      variables: [...primaryShades]
        .reverse()
        .map(scaleToVariables, { name: 'primary' })
    };

    const analogusShades = getColorScale(similarColors.analogus[0].hex);
    color.analogus = {
      id: generateId(),
      shades: analogusShades,
      variables: [...analogusShades]
        .reverse()
        .map(scaleToVariables, { name: 'analogus' })
    };

    const complementaryShades =
      getColorScale(similarColors.complementary.hex);
    color.complementary = {
      id: generateId(),
      shades: complementaryShades,
      variables: [...complementaryShades]
        .reverse()
        .map(scaleToVariables, { name: 'complementary' })
    };

    const triadicShades = getColorScale(similarColors.triadic[0].hex);
    color.triadic = {
      id: generateId(),
      shades: triadicShades,
      variables: [...triadicShades]
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

  return color;
};

const props = ['colorInput', 'showVariables', 'save'];

const data = function() {
  return {
    color: addShades(this.colorInput),
  };
};

const methods = {
  onColorChange() {
    addShades(this.color);
  }
};

const created = function() {
  this.$watch('colorInput', _.debounce((colorInput) => {
    this.color = colorInput;

    this.onColorChange();
  }, 500));

  this.$watch('colorInput.hex', (hex) => {
    this.color = Object.assign({}, this.color, { hex });

    this.onColorChange();
  });
};

Vue.component('color-definition', {
  template,
  props,
  data,
  methods,
  created,
});
