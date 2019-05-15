(function paletteGenerator(Vue){
  'use strict';

  const generateId = () => {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(16);
  };
  const makeColor = (name = '', hex = '') => ({ name, hex, id: generateId() });

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

      save();
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
}(Vue));
