const MapMaker = require('./MapMaker');

/**
 * Creates a new CountMapMaker which uses the specified helper to
 * generate keys for counting elements within an array.
 *
 * The helper is responsible for identifying the count associated with
 * any given element.
 *
 * @param {Helper} helper the helper which will be responsible for
 *        identifying and transforming elements
 * @returns a function that can be used as the callbackFn argument
 *          for `Array.prototype.reduce`
 */
function CountMapMaker(helper) {
  return MapMaker.apply(this, [helper]);
}

CountMapMaker.prototype = Object.create(MapMaker.prototype, {
  constructor: {
    value: CountMapMaker,
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
CountMapMaker.prototype.getValue = function (element, currentCountValue) {
  return (currentCountValue || 0) + 1;
};

module.exports = CountMapMaker;
