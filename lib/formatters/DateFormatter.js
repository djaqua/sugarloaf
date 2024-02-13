const Formatter = require('./Formatter');

const DEFAULT_KEY_FORMATTER = {
  format: (date) => {
    return date.toISOString();
  },
};

const DEFAULT_VALUE_FORMATTER = {
  format: (date) => {
    return date;
  },
};

/**
 * Creates a new DateFormatter.
 * @param {object} options
 * @param {{format:(date:Date)=>string}} options.keyFormat
 * @param {{format:(date:Date)=>any}} options.valueFormat
 *
 */
function DateFormatter(options) {
  Formatter.apply(this, [options]);

  // use the key format if its specified or default to DEFAULT_FORMAT
  this.keyFormat = (options || {}).keyFormat || DEFAULT_KEY_FORMATTER;

  // use the value format if its specified or default to DEFAULT_FORMAT
  this.valueFormat = (options || {}).valueFormat || DEFAULT_VALUE_FORMATTER;
}

DateFormatter.prototype = Object.create(Formatter.prototype, {
  constructor: {
    value: DateFormatter,
  },
});

/**
 *
 * @param {Date} element
 * @returns
 */
DateFormatter.prototype.toKey = function (element) {
  return this.keyFormat.format(element);
};

module.exports = DateFormatter;
