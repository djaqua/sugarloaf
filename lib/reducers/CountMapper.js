const Mapper = require('./Mapper');

/**
 * Creates a new CountMapper which uses the specified formatter to
 * generate keys for counting elements within an array.
 *
 * The formatter is responsible for identifying the count associated with
 * any given element.
 *
 *
 * @param {Formatter} formatter the formatter used to generate keys
 *        for any given element.
 * @returns a function that can be used as the callbackFn
 *          of `Array.prototype.reduce`
 */
function CountMapper(formatter) {
  return Mapper.apply(this, [formatter]);
}

CountMapper.prototype = Object.create(Mapper.prototype, {
  constructor: {
    value: CountMapper,
  },
});

/**
 * Returns the number of times the specified element has been
 * counted. If currentCountValue is falsey, then this method
 * returns a new count value of 1.
 *
 * @param {T} element (unused) the element being counted
 * @param {number | null} currentCountValue the current count value
 *        for the entry associated with the specified element
 * @returns {number} the new count value for the entry associated with
 *          the specified value.
 */
CountMapper.prototype.getValue = function (element, currentCountValue) {
  return (currentCountValue || 0) + 1;
};

module.exports = CountMapper;
