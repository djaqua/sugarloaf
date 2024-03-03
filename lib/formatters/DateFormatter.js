/*
  DateFormatter is GoF Adapter designed to adapt Intl.DateTimeFormat to the 
  interface defined by Formatter. 
  
      Formatter  ◁---- DateFormatter  ◇---->  Intl.DateTimeFormat
  
  Since Node.js is weakly typed, this is effectively a base class for an 
  Abstraction in another Bridge Pattern. 
  
      << Abstraction >>  ◇----------->  << Implementor >>
        DateFormatter                {format:(Date)=>string}
              △                                 △
              |                                 | 
   << Refined Abstraction >>       << Concrete Implementator >>
      WeirdDateFormatter               Intl.DateTimeFormat
*/
const Formatter = require('./Formatter');

const DEFAULT_KEY_FORMATTER = {
  format: (date) => {
    return date.toISOString();
  },
};

const DEFAULT_VALUE_FORMATTER = {
  format: (date) => {
    return date;
  },
};

/**
 * Creates a new DateFormatter.
 *
 * Dates are funny creatures; there is no "one date format to rule them all."
 * So, DateFormatter adapts objects which provide a `format` method to the
 * reducer expectations of a Formatter.
 *
 * @param {object} options
 * @param {{format:(date:Date)=>string}} options.keyFormatter an object with a
 *        format method
 * @param {{format:(date:Date)=>any}} options.valueFormatter an object with a
 *        format method
 *
 */
function DateFormatter(options) {
  Formatter.apply(this, [options]);

  // use the key format if its specified or default to DEFAULT_KEY_FORMAT
  this.keyFormatter = (options || {}).keyFormatter || DEFAULT_KEY_FORMATTER;

  // use the value format if its specified or default to DEFAULT_VALUE_FORMAT
  this.valueFormatter = (options || {}).valueFormatter || DEFAULT_VALUE_FORMATTER;
}

DateFormatter.prototype = Object.create(Formatter.prototype, {
  constructor: {
    value: DateFormatter,
  },
});

/**
 * Formats the specified element for use as a key in an object.
 *
 * @param {Date} element a date element within a collection
 * @returns {K} the key-formatted element
 */
DateFormatter.prototype.toKey = function (element) {
  return this.keyFormatter.format(element);
};

/**
 * Formats the specified element for use as a value in either an array
 * or an object.
 *
 * @param {Date} element an element within a collection
 * @returns {V} the value-formatted element
 */
DateFormatter.prototype.toValue = function (element) {
  return this.valueFormatter.format(element);
};

module.exports = DateFormatter;
