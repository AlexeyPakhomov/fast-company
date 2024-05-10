export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, fieldData, config) {
    let statusValidaion;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof fieldData === 'boolean') {
          statusValidaion = !fieldData;
        } else {
          statusValidaion = fieldData.trim() === '';
        }
        break;
      }
      case 'isEmail':
        const mailRegExp = /^\S+@{1}\S+\.\S+/g;
        statusValidaion = !mailRegExp.test(fieldData);
        break;
      case 'isCapitalSymbol':
        const capitalSymbolRegExp = /[A-Z, А-Я]+/g;
        statusValidaion = !capitalSymbolRegExp.test(fieldData);
        break;
      case 'isContainDigit':
        const digitRegExp = /\d+/g;
        statusValidaion = !digitRegExp.test(fieldData);
        break;
      case 'min':
        statusValidaion = fieldData.length < config.value;
        break;

      default:
        break;
    }

    if (statusValidaion) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
