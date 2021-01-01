const formatDate = (date) => {
    return date.getFullYear() + '-' + String("0" + (date.getMonth() + 1)).slice(-2) + '-' + String("0" + date.getDate()).slice(-2);
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export {
    formatDate,
    getKeyByValue
};
