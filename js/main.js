(function paletteGenerator(Vue, rodu){
  'use strict';

  const makeColor =
    (name = '', hex = '') => ({ name, hex, id: rodu.generateId() });

  const getStoredColors = () => {
    return rodu.storage.getItem('colors') || [makeColor()];
  };

  const data = {
    colors: getStoredColors(),
    colorInput: {},
    showVariables: false
  };

  const methods = {
    /*
    onShowVariablesChange() {
      this.showVariables = !Boolean(this.showVariables);
    },*/

    addColor() {
      data.colors.push(makeColor());

      this.save();
    },

    save() {
      rodu.storage.setItem('colors', getStoredColors().concat(data.colors));
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
      this.colorInput = Object.assign({}, color, {
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
}(Vue, rodu));
