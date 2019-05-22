import { generateId } from './utils/generate-id.mjs';
import { storage } from './utils/storage.mjs';

import './components/messenger.mjs';
import './components/color-definition.mjs';

const makeColor =
  (name = '', hex = '') => ({ name, hex, id: generateId() });

const getStoredColors = () => {
  return storage.getItem('colors') || [];
};

const data = {
  colorInput: {},
  showVariables: false,
  storedColors: [],
  message: ''
};

const methods = {
  save() {
    const { name, hex } = this.colorInput;

    const colorExists = this.storedColors.find((color) => color.hex === hex);

    if (colorExists) {
      this.message = {
        content: 'This palette has already been stored!'
      };

      return;
    }

    const id = generateId();

    this.storedColors.push({ id, name, hex });

    storage.setItem('colors', this.storedColors);
  },

  print() {
    window.print();
  },

  restore(palette) {
    this.colorInput = Object.assign({}, palette);
  },

  copyVariables() {
    const containers = Array
      .from(document.querySelectorAll('.color-variables'));

    const getPContent = (pTag) => (pTag.textContent || '').trim();
    const variables = containers
      .map((container) => Array.from(
        container.querySelectorAll('.color-variable-values')
      ))
      .map((pTags) => pTags.map(getPContent).join('\n'));

    navigator.clipboard
      .writeText(variables.join('\n\n'))
      .then(() => this.message = { content: 'Copied!' });
  },

  discard(palette) {
    this.storedColors = this.storedColors.filter((storedColor) => {
      return storedColor.id !== palette.id;
    });

    storage.setItem('colors', this.storedColors);
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

  picker.onOpen = () => {
    picker.setColor(this.colorInput.hex);
  };

  picker.onChange = _.debounce((color) => {
    const hex = color.hex.substring(0, 7);

    if (hex === this.colorInput.hex) {
      return;
    }

    this.colorInput = Object.assign({}, this.colorInput, color, {
      name: '',
      hex
    });
  }, 250);
};

const app = new Vue({
  el: '#app',
  data,
  methods,
  created,
  mounted,
});

