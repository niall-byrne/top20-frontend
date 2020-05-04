export const validateSubmit = (data, success, reject) => {
  if (data.length < 1) {
    reject("You require a name.");
    return false;
  }
  success(data);
  return true;
};

export const validateChange = (data, success, reject) => {
  success(data);
  return true;
};
