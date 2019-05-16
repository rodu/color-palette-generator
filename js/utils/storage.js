(function storage(rodu){
  rodu.storage = {
    getItem(key) {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : value;
    },

    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
})(rodu);
