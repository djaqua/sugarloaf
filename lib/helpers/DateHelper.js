const Helper = require('./Helper');

const DEFAULT_IDENTITY_FORMATTER = {
  format: (date) => {
    return date.toISOString();
  },
};

const DEFAULT_TRANSFORM_FORMATTER = {
  format: (date) => {
    return date;
  },
};

/**
 * Creates a new DateHelper which adapts multiple formatted representations
 * of a date to the interface defined by Helper.
 *
 * @param {object} options
 * @param {{format:(date:Date)=>any}} options.identityFormatter an object with a
 *        format method
 * @param {{format:(date:Date)=>any}} options.transformFormatter an object with a
 *        format method
 */
function DateHelper(options) {
  Helper.apply(this, [options]);

  // use the key format if its specified or default to DEFAULT_KEY_FORMAT
  this.identityFormatter = (options || {}).identityFormatter || DEFAULT_IDENTITY_FORMATTER;

  // use the value format if its specified or default to DEFAULT_VALUE_FORMAT
  this.transformFormatter = (options || {}).transformFormatter || DEFAULT_TRANSFORM_FORMATTER;
}

DateHelper.prototype = Object.create(Helper.prototype, {
  constructor: {
    value: DateHelper,
  },
});

/**
 * Returns a the identity representation of the specified date. The identity
 * representation is constructed by the `identityFormatter` option passed to
 * the constructor, or the ISO-8601 representation of the date if no identity
 * formatter was specified.
 *
 * @param {Date} dateElement a date element within a collection
 * @returns {any} the identity representation of the specified date.
 */
DateHelper.prototype.getIdentity = function (dateElement) {
  return this.identityFormatter.format(dateElement);
};

/**
 * Returns a transformed representation of the specified date. The transformed
 * representation is constructedby the `transformFormatter` option passed to
 * the constructor, or the unmodified date itself if no transform formatter
 * was specified.
 *
 * @param {Date} dateElement a date element within a collection
 * @returns {any} the transformed representation of the specified date.
 */
DateHelper.prototype.transform = function (dateElement) {
  return this.transformFormatter.format(dateElement);
};

module.exports = DateHelper;
