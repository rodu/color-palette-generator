import { generateId } from './utils/generate-id.mjs';
import { storage } from './utils/storage.mjs';

import './components/color-definition.mjs';

const makeColor =
  (name = '', hex = '') => ({ name, hex, id: generateId() });

const getStoredColors = () => {
  return storage.getItem('colors') || [makeColor()];
};

const data = {
  colors: getStoredColors(),
  colorInput: {},
  showVariables: false
};

const methods = {
  addColor() {
    data.colors.push(makeColor());

    this.save();
  },

  save() {
    storage.setItem('colors', getStoredColors().concat(data.colors));
  },

  print() {
    window.print();
  },

  onSubmit(event) {
    event.preventDefault();
  }
};

const mounted = function() {
  // Initializes the color picker
  const parent = document.getElementById('color-box');
  const picker = new Picker({
    parent,
    color: this.colorInput.hex,
    alpha: false
  });

  picker.onChange = (color) => {
    this.colorInput = Object.assign({}, this.colorInput, color, {
      hex: color.hex.substring(0, 7)
    });
  };
};

const app = new Vue({
  el: '#app',
  data,
  methods,
  mounted,
});

