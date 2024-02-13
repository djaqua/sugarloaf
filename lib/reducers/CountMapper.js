const Mapper = require('./Mapper');

function CountMapper(formatter) {
  return Mapper.apply(this, [formatter]);
}

CountMapper.prototype = Object.create(Mapper.prototype, {
  constructor: {
    value: CountMapper,
  },
});

/**
 *
 * @param {*} element (unused)
 * @param {number} currentValue the current count of the specified element
 * @returns
 */
CountMapper.prototype.getValue = function (element, currentValue) {
  return (currentValue || 0) + 1;
};

module.exports = CountMapper;
