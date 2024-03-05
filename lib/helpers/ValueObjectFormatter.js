const Formatter = require('./Formatter');

const DEFAULT_KEY_DELIMITER = '|';

/**
 * Creates a new ValueObjectFormatter. This formatter is the right tool for
 * the job when formatting Value Objects (objects fundamentally defined by
 * their attributes as opposed to their identity).
 *
 * ***CAUTION*** By default, keys are delimited by a pipe ("|") character. Be mindful of
 * key collisions that occur when text properties contain the delimiter, e.g:
 * ```js
 *  { a: '|', b: ''} // '||'
 *  { a: '', b: '|'} // '||'
 *  { x: '', y: '|'} // '||'
 *
 * ```
 *
 * Fix this by specifying a custom delimiter in the constructor options parameter
 *
 * @param {object} options an object that contains configuration options for
 *                 the new ValueObjectFormatter
 * @param {string} options.keyDelimiter used to delimit the values of an
 *                 object element in the formatted key. By default, this
 *                 will be a pipe ("|") character.
 */
function ValueObjectFormatter(options) {
  Formatter.apply(this, [options]);
  this.keyDelimiter = (options || {}).keyDelimiter || DEFAULT_KEY_DELIMITER;
}

ValueObjectFormatter.prototype = Object.create(Formatter.prototype, {
  constructor: {
    value: ValueObjectFormatter,
  },
});

/**
 * Returns a delimited representation of the values in an object
 * element as a string. Example:
 *
 *    ```js
 *    var f1 = new Formatter();
 *    f1.toKey({a:'Z', n: 57});  // 'Z|57'
 *
 *    var f2 = new Formatter({
 *      keyDelimiter: '~'
 *    });
 *    f2.toKey({a:'Z', n: 57}); // 'Z~57'
 *    ```
 *
 * @param {Object} element a value object
 * @returns a delimited representation of an objec
 */
ValueObjectFormatter.prototype.toKey = function (element) {
  return Object.values(element).join(this.keyDelimiter);
};

module.exports = ValueObjectFormatter;
