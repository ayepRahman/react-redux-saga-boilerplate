import validate from 'validate.js';
import ethereumAddress from 'ethereum-address';
import fileSize from 'filesize';

validate.Promise = window.Promise;

const originalEmailValidator = validate.validators.email;

validate.validators.email = validate.extend(function(value, options) {
  if (!value) return; // Let presence handle null value

  this.PATTERN = originalEmailValidator.PATTERN;
  return originalEmailValidator.bind(this)(value, options);
});

// const originalUrlValidator = validate.validators.url;

// validate.validators.url = validate.extend(function(value, options) {
//   if (!value) return; // Let presence handle null value

//   // Normalize blank string
//   let finalValue = value === '' ? null : value;
//   const defaultScheme = options && options.defaultScheme;
//   finalValue = defaultScheme ? ensureScheme(value, defaultScheme) : finalValue;
//   const originalUrlValidationResult = originalUrlValidator.bind(this)(finalValue, options);
//   if (originalUrlValidationResult) return originalUrlValidationResult;

//   if (options.domains && options.domains.length > 0) {
//     const domains = options.domains;
//     const schemes = options.schemes || ['http', 'https'];

//     let hasDomain = false;
//     for (let d = 0; d < domains.length; d++) {
//       const domain = domains[d];

//       for (let s = 0; s < schemes.length; s++) {
//         const scheme = schemes[s];

//         if (finalValue.startsWith(`${scheme}://${domain}`)) {
//           hasDomain = true;
//           break;
//         }
//       }

//       if (hasDomain) break;
//     }

//     if (!hasDomain) return options.domainMessage || options.message;
//   }
// });

validate.validators.ethereumAddress = validate.extend(function(value, options) {
  options = validate.extend({}, this.options, options);
  const message = options.message || this.message || 'is not a valid ethereum address';
  // Empty values are fine
  if (!validate.isDefined(value)) {
    return;
  }
  if (!validate.isString(value)) {
    return message;
  }
  if (validate.isEmpty(value)) {
    return;
  }
  if (!ethereumAddress.isAddress(value)) {
    return message;
  }
});

validate.validators.fileSize = validate.extend(function(value, options, attribute) {
  options = validate.extend({}, this.options, options);
  if (!validate.isDefined(value)) {
    return;
  }
  if (!(validate.isObject(value) || value instanceof File)) {
    return;
  }

  const { minimum, maximum } = options;
  const errors = [];
  const size = value.size;
  if (!validate.isNumber(size)) {
    validate.error(
      validate.format('Attribute %{attr} has a non numeric value for `size`', { attr: attribute })
    );
    return options.message || this.notValid || 'has an incorrect size';
  }

  if (validate.isNumber(minimum) && size < minimum) {
    const err = options.tooSmall || this.tooSmall || 'File is too small (minimum is %{size})';
    errors.push(validate.format(err, { size: fileSize(minimum) }));
  }

  if (validate.isNumber(maximum) && size > maximum) {
    const err = options.tooBig || this.tooBig || 'File is too big (maximum is %{size})';
    errors.push(validate.format(err, { size: fileSize(maximum) }));
  }

  if (errors.length > 0) {
    return options.message || errors;
  }
});

validate.validators.file = validate.extend(function(value, options) {
  options = validate.extend({}, this.options, options);
  if (!validate.isDefined(value)) {
    return;
  }
  if (!(validate.isObject(value) || value instanceof File)) {
    return;
  }

  const errors = [];
  if (options.type) {
    const typeResult = validate.validators.format.bind(this)(value, options.type);
    if (validate.isDefined(typeResult)) errors.push(typeResult);
  }
  if (options.size) {
    const sizeResult = validate.validators.fileSize.bind(this)(value, options.size);
    if (validate.isDefined(sizeResult)) errors.push(sizeResult);
  }

  if (errors.length > 0) {
    return options.message || errors;
  }
});

// validate.validators.username = validate.extend(function(value, options) {
//   options = validate.extend({}, this.options, options);
//   const pattern = options.pattern || /[A-Z0-9_-]+/i;
//   const message =
//     options.message || this.message || 'can only contain a-z, 0-9, underscores(_) and dashes(-)';
//   return validate.validators.format.bind(this)(value, { ...options, pattern, message });
// });

// validate.validators.uniquenessAsync = validate.extend(function(value, options) {
//   options = validate.extend({}, this.options, options);
//   const api = options.api;
//   const message = options.message || this.message || 'is not a valid username';
//   const apiMessage = options.message || this.message;

//   if (!validate.isDefined(api)) {
//     return;
//   }
//   if (!validate.isDefined(value)) {
//     return;
//   }
//   if (!validate.isString(value)) {
//     return message;
//   }
//   if (validate.isEmpty(value)) {
//     return;
//   }

//   return new validate.Promise(function(resolve, reject) {
//     callApiJson(api(value))
//       .then(response => {
//         if (response.success) {
//           resolve(null);
//         } else {
//           // Validation message need to be passed to resolve, not reject
//           resolve(apiMessage || response.message);
//         }
//       })
//       .catch(error => {
//         reject(error.message);
//       });
//   });
// });

// validate.validators.companyPrettyId = validate.validators.username;
// validate.validators.badgePrettyId = validate.validators.username;

validate.validators.json = validate.extend(function(value, options) {
  options = validate.extend({}, this.options, options);
  const message = options.message || this.message || 'is not a valid json';

  if (!validate.isDefined(value)) {
    return;
  }
  if (!validate.isString(value)) {
    return;
  }
  if (validate.isEmpty(value)) {
    return;
  }
  try {
    JSON.parse(value);
  } catch (ex) {
    return message;
  }
});

validate.validators.truthy = validate.extend(function(value, options) {
  options = validate.extend({}, this.options, options);
  const message = options.message || this.message || 'is not a truthy';

  if (!value) return message;
});

const validator = (fields, options = null) => {
  return values => validate(values, fields, options);
};

validator.async = (fields, options = null) => {
  return values => validate.async(values, fields, options);
};

export default validator;
