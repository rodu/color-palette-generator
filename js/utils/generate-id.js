(function generateId(rodu){
  'use strict';

  const generateId = () => {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(16);
  };

  rodu.generateId = generateId;
})(rodu);
