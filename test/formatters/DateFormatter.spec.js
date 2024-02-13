const { describe, it } = require('mocha');

// TODO add tests to prove that valueFormatter works
const DateFormatter = require('./../../lib/formatters/DateFormatter');

describe('lib/mappers/formatters/DateFormatter', () => {
  describe('default constructor', () => {
    let formatter;
    beforeEach(() => {
      formatter = new DateFormatter();
    });
    describe('toKey', () => {
      describe('undefined elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toISOString')", () => {
          expect(() => {
            formatter.toKey(undefined);
          }).to.throw("Cannot read properties of undefined (reading 'toISOString')");
        });
      });

      describe('null elements', () => {
        it("should throw TypeError: Cannot read properties of null (reading 'toISOString')", () => {
          expect(() => {
            formatter.toKey(null);
          }).to.throw("Cannot read properties of null (reading 'toISOString')");
        });
      });

      describe('string elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey('alphabeta');
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('number elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey(57);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Date elements', () => {
        it("should return 'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)' (string)", () => {
          const expected = '2024-02-09T03:36:51.944Z';
          expect(formatter.toKey(new Date(expected))).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey([2, 3, 4]);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Object elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('date.toISOString is not a function');
        });
      });
    });

    /*
    describe("toValue", () => {
      describe("undefined elements", () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toISOString')", () => {
          expect(() => {
            formatter.toValue(undefined);
          }).to.throw(
            "Cannot read properties of undefined (reading 'toISOString')"
          );
        });
      });

      describe("null elements", () => {
        it("should throw TypeError: Cannot read properties of null (reading 'toISOString')", () => {
          expect(() => {
            formatter.toValue(null);
          }).to.throw("Cannot read properties of null (reading 'toISOString')");
        });
      });

      describe("string elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toValue("alphabeta");
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("number elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toValue(57);
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("Date elements", () => {
        it("should return 'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)' (string)", () => {
          const expected = "2024-02-09T03:36:51.944Z";
          expect(formatter.toValue(new Date(expected))).to.be.eql(expected);
        });
      });

      describe("Array elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toValue([2, 3, 4]);
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("Object elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toValue({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("date.toISOString is not a function");
        });
      });
    });
    */
  });

  describe('constructor with keyFormatter specified', () => {
    let formatter;

    beforeEach(() => {
      // keyFormat =
      formatter = new DateFormatter({
        keyFormat: Intl.DateTimeFormat('en-US'),
      });
    });

    describe('toKey', () => {
      describe('undefined elements', () => {
        it('should return the current date in MM/DD/YYYY format', () => {
          expect(formatter.toKey(undefined)).to.be.equal(
            Intl.DateTimeFormat('en-US').format(new Date())
          );
        });
      });

      describe('null elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(null)).to.be.equal('12/31/1969');
        });
      });

      describe('string elements', () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            formatter.toKey('alphabeta');
          }).to.throw('Invalid time value');
        });
      });

      describe('number elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(0)).to.be.equal('12/31/1969');
        });

        it("should return '1/1/1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(100000000)).to.be.equal('1/1/1970');
        });
      });

      describe('Date elements', () => {
        it("should return '2/8/2024' (string)", () => {
          expect(formatter.toKey(new Date('2024-02-09T03:36:51.944Z'))).to.be.eql('2/8/2024');
        });
      });

      describe('Array elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toKey([2, 3, 4]);
          }).to.throw('Invalid time value');
        });
      });

      describe('Object elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toKey({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('Invalid time value');
        });
      });
    });

    /*
    describe("toValue", () => {
      describe("undefined elements", () => {
        it("should return the same thing as toKey", () => {
          expect(formatter.toValue(undefined)).to.be.equal(
            formatter.toKey(undefined)
          );
        });
      });

      describe("null elements", () => {
        it("should return the same thing as toKey", () => {
          expect(formatter.toValue(null)).to.be.equal(formatter.toKey(null));
        });
      });

      describe("string elements", () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            formatter.toValue("alphabeta");
          }).to.throw("Invalid time value");
        });
      });

      describe("number elements", () => {
        it("should return the same thing as toKey", () => {
          expect(formatter.toValue(0)).to.be.equal(formatter.toKey(0));
        });

        it("should return the same thing as toKey", () => {
          expect(formatter.toValue(100000000)).to.be.equal(
            formatter.toKey(100000000)
          );
        });
      });

      describe("Date elements", () => {
        it("should return the same thing as toKey", () => {
          const date = new Date("2024-02-09T03:36:51.944Z");
          expect(formatter.toValue(date)).to.be.eql(formatter.toKey(date));
        });
      });

      describe("Array elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue([2, 3, 4]);
          }).to.throw("Invalid time value");
        });
      });

      describe("Object elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("Invalid time value");
        });
      });
    });
    */
  });

  /*
  describe("constructor with valueFormatter specified", () => {
    let formatter;

    beforeEach(() => {
      formatter = new DateFormatter({
        valueFormat: Intl.DateTimeFormat("en-US"),
      });
    });

    describe("toKey", () => {
      describe("undefined elements", () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toISOString')", () => {
          expect(() => {
            formatter.toKey(undefined);
          }).to.throw(
            "Cannot read properties of undefined (reading 'toISOString')"
          );
        });
      });

      describe("null elements", () => {
        it("should throw TypeError: Cannot read properties of null (reading 'toISOString')", () => {
          expect(() => {
            formatter.toKey(null);
          }).to.throw("Cannot read properties of null (reading 'toISOString')");
        });
      });

      describe("string elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey("alphabeta");
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("number elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey(57);
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("Date elements", () => {
        it("should return 'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)' (string)", () => {
          const expected = "2024-02-09T03:36:51.944Z";
          expect(formatter.toKey(new Date(expected))).to.be.eql(expected);
        });
      });

      describe("Array elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey([2, 3, 4]);
          }).to.throw("date.toISOString is not a function");
        });
      });

      describe("Object elements", () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            formatter.toKey({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("date.toISOString is not a function");
        });
      });
    });

    
    describe("toValue", () => {
      describe("undefined elements", () => {
        it("should return the current date in MM/DD/YYYY format", () => {
          expect(formatter.toValue(undefined)).to.be.equal(
            Intl.DateTimeFormat("en-US").format(new Date())
          );
        });
      });

      describe("null elements", () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(null)).to.be.equal("12/31/1969");
        });
      });

      describe("string elements", () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            formatter.toValue("alphabeta");
          }).to.throw("Invalid time value");
        });
      });

      describe("number elements", () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(0)).to.be.equal("12/31/1969");
        });

        it("should return '1/1/1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(100000000)).to.be.equal("1/1/1970");
        });
      });

      describe("Date elements", () => {
        it("should return '2/8/2024' (string)", () => {
          expect(
            formatter.toValue(new Date("2024-02-09T03:36:51.944Z"))
          ).to.be.eql("2/8/2024");
        });
      });

      describe("Array elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue([2, 3, 4]);
          }).to.throw("Invalid time value");
        });
      });

      describe("Object elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("Invalid time value");
        });
      });
    });
  });

  describe("constructor with both keyFormatter and valueFormatter specified", () => {
    let formatter;

    beforeEach(() => {
      // keyFormat =
      formatter = new DateFormatter({
        keyFormat: Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
        }),
        valueFormat: Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }),
      });
    });

    describe("toKey", () => {
      describe("undefined elements", () => {
        it("should return the current date in MM/DD/YYYY format", () => {
          expect(formatter.toKey(undefined)).to.be.equal(
            Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(
              new Date()
            )
          );
        });
      });

      describe("null elements", () => {
        it("should return '12/31/69' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(null)).to.be.equal("12/31/69");
        });
      });

      describe("string elements", () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            formatter.toKey("alphabeta");
          }).to.throw("Invalid time value");
        });
      });

      describe("number elements", () => {
        it("should return '12/31/69' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(0)).to.be.equal("12/31/69");
        });

        it("should return '1/1/70' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toKey(100000000)).to.be.equal("1/1/70");
        });
      });

      describe("Date elements", () => {
        it("should return '2/8/24' (string)", () => {
          expect(
            formatter.toKey(new Date("2024-02-09T03:36:51.944Z"))
          ).to.be.eql("2/8/24");
        });
      });

      describe("Array elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toKey([2, 3, 4]);
          }).to.throw("Invalid time value");
        });
      });

      describe("Object elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toKey({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("Invalid time value");
        });
      });
    });

    describe("toValue", () => {
      describe("undefined elements", () => {
        it("should return the current date in MM/DD/YYYY format", () => {
          expect(formatter.toValue(undefined)).to.be.equal(
            Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
              new Date()
            )
          );
        });
      });

      describe("null elements", () => {
        it("should return 'December 31, 1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(null)).to.be.eql("December 31, 1969");
        });
      });

      describe("string elements", () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            formatter.toValue("alphabeta");
          }).to.throw("Invalid time value");
        });
      });

      describe("number elements", () => {
        it("should return 'December 31, 1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(0)).to.be.equal("December 31, 1969");
        });

        it("should return 'January 1, 1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(formatter.toValue(100000000)).to.be.equal("January 1, 1970");
        });
      });

      describe("Date elements", () => {
        it("should return 'February 8, 2024' (string)", () => {
          expect(
            formatter.toValue(new Date("2024-02-09T03:36:51.944Z"))
          ).to.be.eql("February 8, 2024");
        });
      });

      describe("Array elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue([2, 3, 4]);
          }).to.throw("Invalid time value");
        });
      });

      describe("Object elements", () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            formatter.toValue({ a: "alpha", b: "beta", c: 57 });
          }).to.throw("Invalid time value");
        });
      });
    });
  });
  // */
});
