/**
 * Creates a new Helper which can be used to identify and transform elements
 * within an array.
 *
 * This is the base class for other helpers and is *generally* suitable for
 * numbers, strings, dates, and even arrays. Nuance may apply.
 *
 * @param {object} options unused
 */
function Helper(options) {
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
Helper.prototype.getIdentity = function (element) {
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
Helper.prototype.transform = function (element) {
  return element;
};

module.exports = Helper;
