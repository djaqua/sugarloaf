const { describe, it } = require('mocha');
const Mapper = require('./../../lib/reducers/Mapper');

// TODO write test cases for execute that show that currentIndex and array are unused

/*
 Theory of operation
 -------------------
  Since Mapper (and its subclasses)
    - constitutes the "abstraction" portion of the GoF Bridge Pattern, 
    - cannot exist without the "implementation" portion of the GoF pattern

  and since 
    - it would be highly impractical to write tests for every combination
      of abstraction and implementation (verging on an anti-pattern approach)
    - it would be inappropriate to taylor test cases around the specifications
      of functionality outside the scope of Mapper (or its subclasses)

  then tests must therefore be written to verify the abstract functionality as it pertains soley to the specifications of Mapper (and its subclasses) with respect to any functionality defined immediately within the context of the test suite itself. 

  So, MockFormatter is designed specifically to demonstrate that 
    - the abstraction (i.e. Mapper) chooses how/where/when to use keys and values
    - the implementation (i.e. MockFormatter) chooses what keys and values to use
  
  This is achieved by maintaining state exclusively within MockFormatter in a way that also proves
  that its methods are being used according to the specifications of Mapper, hence an access count is incorporated into the keys and values generated.
*/

function MockFormatter() {
  this.keyCount = 0;
  this.valueCount = 0;
}
MockFormatter.prototype.toKey = function () {
  return `key${this.keyCount++}`;
};

MockFormatter.prototype.toValue = function () {
  return `value${this.valueCount++}`;
};

describe('Mapper', () => {
  context('cannot exist without a formatter', () => {
    context('constructed properly (formatter specified)', () => {
      let mapper;

      beforeEach(() => {
        mapper = new Mapper(new MockFormatter());
      });

      describe('undefined elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, undefined);

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, undefined);
          mapper(actual, undefined);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('null elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, null);

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, null);
          mapper(actual, null);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('string elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, 'alphabeta');

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, 'alphabeta');
          mapper(actual, 'alphabeta');

          expect(actual).to.be.eql(expected);
        });
      });

      describe('number elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, 57);

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, 57);
          mapper(actual, 57);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Date elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, new Date());

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, new Date());
          mapper(actual, new Date());

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, [2, 3, 4]);

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, [2, 3, 4]);
          mapper(actual, [2, 3, 4]);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Object elements', () => {
        it("should add the entry 'key0 = value0' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0' };

          mapper(actual, { text: 'alphabeta' });

          expect(actual).to.be.eql(expected);
        });

        it("should add the entries 'key0 = value0' & 'key1 = value1' to the map", () => {
          const actual = {};
          const expected = { key0: 'value0', key1: 'value1' };

          mapper(actual, { text: 'alphabeta' });
          mapper(actual, { text: 'alphabeta' });

          expect(actual).to.be.eql(expected);
        });
      });
    });

    context('improperly constructed (no formatter specified)', () => {
      //
      // A Mapper cannot exist without a Formatter
      //

      let mapper;

      beforeEach(() => {
        mapper = new Mapper();
      });

      describe('undefined elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, undefined);
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('null elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, null);
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('string elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, 'alphabeta');
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('number elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, 57);
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('Date elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, new Date());
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('Array elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, [2, 3, 4]);
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });

      describe('Object elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toKey')", () => {
          expect(() => {
            mapper({}, { text: 'alphabeta' });
          }).to.throw("Cannot read properties of undefined (reading 'toKey')");
        });
      });
    });
  });
});
