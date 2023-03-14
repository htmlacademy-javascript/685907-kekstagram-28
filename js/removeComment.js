const removeComments = function (list) {
  for (let i = 0; i < list.length; i++) {
    list[i].remove();
  }
};

export {removeComments};
