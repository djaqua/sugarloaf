const MapMaker = require('./MapMaker');

/**
 * Creates a new GroupMapMaker which uses the specified helper to
 * generate keys and their corresponding values for grouping
 * elements in an array.
 *
 * The helper is responsible for determining which elements belong to any
 * given group and their representation within that group.
 *
 * @param {Helper} helper the helper which will be responsible for
 *        identifying and transforming elements
 * @returns a function that can be used as the callbackFn argument
 *          for `Array.prototype.reduce`
 */
function GroupMapMaker(helper) {
  return MapMaker.apply(this, [helper]);
}

GroupMapMaker.prototype = Object.create(MapMaker.prototype, {
  constructor: {
    value: GroupMapMaker,
  },
});

/**
 * Returns an array from the currentValue concatenated with the specified
 * element. If the current value is falsey, then an array with only
 * the specified element is returned.
 *
 * @param {T} element an element to associate with the current group
 *        value of an entry
 * @param {Array<T> | null} currentGroupValue the current group value
 *        for the entry associated with the specified element
 * @returns {Array<T>} the new group value for the entry associated with
 *          the specified value.
 */
GroupMapMaker.prototype.getValue = function (element, currentGroupValue) {
  return (currentGroupValue || []).concat(this.helper.transform(element));
};

module.exports = GroupMapMaker;
