/*
  Formatter is the base class which defines the responsibilities of an 
  Implementor in a GoF Bridge Pattern, so it needs to be the singlemost stable
  unit of code in this package.

      << Abstraction >>  ◇----------->  << Implementor >>
              △                             Formatter
              |                                 △
              |                                 | 
   << Refined Abstraction >>       << Concrete Implementator >>
*/

/**
 * Creates a new Formatter which can be used to format key-value pairs
 * for maps or to format values for arrays.
 *
 * This is the base class for other formatters and is *generally* suitable for
 * numbers, strings, dates, and even arrays.
 *
 * @param {object} options unused
 */
function Formatter(options) {
  // options is just a structural placeholder
}

/**
 * Returns the specified element.
 *
 * Subclasses will generally *need* to override this method to produce a key
 * which is suitable for association with the specified element.
 *
 * @param {T} element an element within a collection
 * @returns {T} the specified element
 */
Formatter.prototype.toKey = function (element) {
  return element;
};

/**
 * Returns the specified element.
 *
 * Subclasses *can* override this method to generate appropriate
 * representations as necessary in specific contexts.
 *
 * @param {T} element an element within a collection
 * @returns {T} the specified element
 */
Formatter.prototype.toValue = function (element) {
  return element;
};

module.exports = Formatter;
