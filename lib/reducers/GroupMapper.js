const Mapper = require('./Mapper');

function GroupMapper(formatter) {
  return Mapper.apply(this, [formatter]);
}

GroupMapper.prototype = Object.create(Mapper.prototype, {
  constructor: {
    value: GroupMapper,
  },
});

/**
 *
 * @param {*} element
 * @param {Array | null} currentValue
 * @returns
 */
GroupMapper.prototype.getValue = function (element, currentValue) {
  return (currentValue || []).concat(this.formatter.toValue(element));
};

module.exports = GroupMapper;
