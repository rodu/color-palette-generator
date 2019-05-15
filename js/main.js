(function paletteGenerator(Vue, rodu){
  'use strict';

  const makeColor =
    (name = '', hex = '') => ({ name, hex, id: rodu.generateId() });

  const getStoredColors = () => {
    const storedColors = localStorage.getItem('colors');

    if (storedColors) {
      return JSON.parse(storedColors);
    }

    return [makeColor()];
  };
  const data = {
    colors: getStoredColors()
  };

  const methods = {
    addColor() {
      data.colors.push(makeColor());

      this.save();
    },

    save() {
      localStorage.setItem('colors', JSON.stringify(data.colors));
    },

    onSubmit(event) {
      event.preventDefault();
    }
  };

  const app = new Vue({
    el: '#app',
    data,
    methods,
  });
}(Vue, rodu));
