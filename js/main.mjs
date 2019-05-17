import { generateId } from './utils/generate-id.mjs';
import { storage } from './utils/storage.mjs';

import './components/color-definition.mjs';

const makeColor =
  (name = '', hex = '') => ({ name, hex, id: generateId() });

const getStoredColors = () => {
  return storage.getItem('colors') || [];
};

const data = {
  colorInput: {},
  showVariables: false,
  storedColors: []
};

const methods = {
  save() {
    const { name, hex } = this.colorInput;

    const colorExists = this.storedColors.find((color) => {
      return color.name === name || color.hex === hex;
    });

    if (colorExists) {
      //TODO: Give message to user for existing color!
      return;
    }

    this.storedColors.push({ name, hex });

    storage.setItem('colors', this.storedColors);
  },

  print() {
    window.print();
  },

  restore(palette) {
    this.colorInput = Object.assign({}, palette);
  },

  onSubmit(event) {
    event.preventDefault();
  }
};

const created = function() {
  this.storedColors = getStoredColors();
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
  created,
  mounted,
});

