const Formatter = require('./Formatter');

const DEFAULT_KEY_DELIMITER = '|';
function ArrayFormatter(options) {
  Formatter.apply(this, [options]);
  this.keyDelimiter = (options || {}).keyDelimiter || DEFAULT_KEY_DELIMITER;
}

ArrayFormatter.prototype = Object.create(Formatter.prototype, {
  constructor: {
    value: ArrayFormatter,
  },
});

/**
 *
 * @param {Array} element
 * @returns
 */
ArrayFormatter.prototype.toKey = function (element) {
  return element.join(this.keyDelimiter);
};

module.exports = ArrayFormatter;
