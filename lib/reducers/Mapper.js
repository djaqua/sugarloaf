const Formatter = require('../formatters/Formatter');

/**
 * Creates a new Mapper which uses the specified formatter to generate
 * keys and their corresponding values from elements. An instance of Mapper
 * cannot function without a formatter.
 *
 * @param {Formatter} formatter the formatter used to generate keys and values
 *                    for any given element.
 * @returns a reducer that can be used as the callbackFn of
 */
function Mapper(formatter) {
  this.formatter = formatter;
  return this.execute.bind(this);
}

/**
 * A function to execute for each element in an array being reduced. This is
 * a template method that provides sane default behavior while allowing
 * subclasses to add new behavior by overriding `getKey` and `getValue`.
 *
 * @param {object} accumulator the value resulting from the previous call to execute.
 * @param {T} currentElement the current element in the array
 * @param {number} currentIndex (unused) the index of the current element in the array being reduced
 * @param {T[]} array (unused) the array being reduced
 * @returns {object} the value of the specified accumulator
 */
Mapper.prototype.execute = function (accumulator, currentElement, currentIndex, array) {
  const key = this.getKey(currentElement);
  accumulator[key] = this.getValue(currentElement, accumulator[key]);
  return accumulator;
};

/**
 * Returns the key produced by the formatter for the specified element.
 *
 * Subclasses can override this method to produce more exotic mappings, but
 * in most cases this implementation will be sufficient.
 *
 * @param {T} element the currentElement argument supplied to execute
 * @returns {K} a key for the specified element
 */
Mapper.prototype.getKey = function (element) {
  return this.formatter.toKey(element);
};

/**
 * Returns the value produced by the formatter for the specified element.
 *
 * Subclasses will typically override this method to provide new
 * functionality.
 *
 * @param {T} element the currentElement argument supplied to execute
 * @param {V} currentValue the last value produced for the specified element
 * @returns {V} a value for the specified element
 */
Mapper.prototype.getValue = function (element, currentValue) {
  return this.formatter.toValue(element);
};

module.exports = Mapper;
