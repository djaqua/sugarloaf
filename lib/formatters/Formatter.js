/**
 * Creates a new Formatter which can be used to format key-value pairs
 * for maps or to format values for arrays.
 *
 * This is the base class for other formatters and is *generally* suitable for
 * numbers, strings, dates, and even arrays.
 */
function Formatter() {}

/**
 * Returns the specified element.
 *
 * Subclasses will generally need to override this method to produce a key
 * which is suitable for association with the specified element.
 *
 * @param {any} element an element within an array.
 * @returns the unmodified element.
 */
Formatter.prototype.toKey = function (element) {
  return element;
};

/**
 * Returns the specified element.
 *
 * Subclasses can override this method to generate appropriate
 * representations as necessary in specific contexts.
 *
 * @param {any} element
 * @returns
 */
Formatter.prototype.toValue = function (element) {
  return element;
};

module.exports = Formatter;
