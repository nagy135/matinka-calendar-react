const formatDate = (date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export {
    formatDate,
    getKeyByValue
};
