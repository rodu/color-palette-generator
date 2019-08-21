
const template = `
  <div class="color-item">
    <h3 class="color-title" v-if="title">{{title}}</h3>
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
    <div class="color-variables screen-only" v-show="showVariables">
      <h3>SASS variables</h3>
      <div class="overrides">
        <label for="variables-exclude">
          Exclude this color from export
          <input id="variables-exclude" type="checkbox" v-model="excluded">
        </label>
        <label v-if="!excluded" for="variables-override">
          Override variable names
          <input id="variables-override" type="checkbox" v-model="override">
        </label>
        <div v-if="override && !excluded" class="override-form">
          <select v-model="selectedName">
            <option value="brand-primary">brand-primary</option>
            <option value="brand-secondary">brand-secondary</option>
            <option value="brand-accent">brand-accent</option>
            <option value="else">Something else...</option>
          </select>
          <input
            v-if="selectedName === 'else'"
            type="text"
            v-model="customName"
            placeholder="Type here a variable name">
        </div>
      </div>
      <p
        v-if="!excluded"
        v-for="variable in definition.variables"
        class="color-variable-values"
        v-bind:key="variable.id">
        <span v-if="override && selectedName">
          \${{variableName(variable)}}-{{variable.shade.group}}: {{variable.shade.hex}}
        </span>
        <span v-else>{{variable.value}}</span>
      </p>
    </div>
  </div>
`;

const props = [
  'title',
  'definition',
  'showVariables',
];

const data = () => ({
  excluded: false,
  override: false,
  selectedName: '',
  customName: '',
});

const methods = {
  variableName(variable) {
    const { customName, selectedName } = this;

    return selectedName === 'else' ? customName : selectedName;
  }
};

Vue.component('color-item', { template, props, data, methods });
