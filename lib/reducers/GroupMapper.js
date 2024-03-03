const Mapper = require('./Mapper');

/**
 * Creates a new GroupMapper which uses the specified formatter to
 * generate keys and their corresponding values for grouping
 * elements in an array.
 *
 * The formatter is responsible for determining which elements belong to any
 * given group (via calling `toKey`) and their representation within
 * that group (via `toValue`)
 *
 * @param {Formatter} formatter the formatter used to generate keys
 *        and values for any given element.
 * @returns a function that can be used as the callbackFn
 *          of `Array.prototype.reduce`
 */
function GroupMapper(formatter) {
  return Mapper.apply(this, [formatter]);
}

GroupMapper.prototype = Object.create(Mapper.prototype, {
  constructor: {
    value: GroupMapper,
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
GroupMapper.prototype.getValue = function (element, currentGroupValue) {
  return (currentGroupValue || []).concat(this.formatter.toValue(element));
};

module.exports = GroupMapper;
