const { describe, it } = require('mocha');
const MapMaker = require('../../lib/reducers/MapMaker');

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

function MockHelper() {
  this.keyCount = 0;
  this.valueCount = 0;
}
MockHelper.prototype.getIdentity = function () {
  return `key${this.keyCount++}`;
};

MockHelper.prototype.transform = function () {
  return `value${this.valueCount++}`;
};

describe('Mapper', () => {
  context('cannot exist without a formatter', () => {
    context('constructed with default formatter', () => {
      let mapper;

      beforeEach(() => {
        mapper = new MapMaker();
      });

      describe('undefined elements', () => {
        it('should add the entry "\'undefined\' = undefined" to the accumulator', () => {
          const actual = {};
          const expected = { undefined: undefined };

          mapper(actual, undefined);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('null elements', () => {
        it('should add the entry "\'null\' = null" to the accumulator', () => {
          const actual = {};
          const expected = { null: null };

          mapper(actual, null);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('string elements', () => {
        it("should add the entry \"'alphabeta' = 'alphabeta'\" to the accumulator", () => {
          const actual = {};
          const expected = { alphabeta: 'alphabeta' };

          mapper(actual, 'alphabeta');

          expect(actual).to.be.eql(expected);
        });
      });

      describe('number elements', () => {
        it('should add the entry "57 = 57" to the accumulator', () => {
          const actual = {};
          const expected = { 57: 57 };

          mapper(actual, 57);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Date elements', () => {
        it('should add the entry "\'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)\' = 2024-02-09T03:36:51.944Z" to the accumulator', () => {
          const date = new Date('2024-02-09T03:36:51.944Z');
          const actual = {};
          const expected = {
            'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)': new Date(date),
          };

          mapper(actual, date);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it('should add the entry "\'2,3,4\' = [2,3,4]" to the accumulator', () => {
          const actual = {};
          const expected = { '2,3,4': [2, 3, 4] };

          mapper(actual, [2, 3, 4]);

          expect(actual).to.be.eql(expected);
        });
      });

      describe('Object elements', () => {
        it('should add the entry "[object Object] = {text: \'alphabeta\'}" to the accumulator', () => {
          const actual = {};
          const expected = { '[object Object]': { text: 'alphabeta' } };

          mapper(actual, { text: 'alphabeta' });

          expect(actual).to.be.eql(expected);
        });

        it('should add the entry "[object Object] = {text2: \'beta\'}" to the accumulator', () => {
          // this shows why the default formatter is woefully insufficient for handling objects
          const actual = {};
          const expected = { '[object Object]': { text2: 'beta' } };

          mapper(actual, { text: 'alpha' });
          mapper(actual, { text2: 'beta' });

          expect(actual).to.be.eql(expected);
        });
      });
    });

    context('constructed with explicitely defined formatter', () => {
      let mapper;

      beforeEach(() => {
        mapper = new MapMaker(new MockHelper());
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

    context('constructed with an invalid formatter', () => {
      let mapper;

      beforeEach(() => {
        mapper = new MapMaker(57);
      });

      describe('undefined elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, undefined);
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('null elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, null);
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('string elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, 'alphabeta');
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('number elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, 57);
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('Date elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, new Date());
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('Array elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, [2, 3, 4]);
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });

      describe('Object elements', () => {
        it('should throw TypeError: this.helper.getIdentity is not a function', () => {
          expect(() => {
            mapper({}, { text: 'alphabeta' });
          }).to.throw('this.helper.getIdentity is not a function');
        });
      });
    });
  });

  context('unused parameters', () => {
    let mapper;

    beforeEach(() => {
      mapper = new MapMaker();
    });

    describe('currentIndex', () => {
      it('should have the same effect for currentIndex=0 as for currentIndex=57', () => {
        const actual = {};
        const expected = {};

        mapper(expected, 'alphabeta', 0);
        mapper(actual, 'alphabeta', 57);

        expect(actual).to.be.eql(expected);
      });
    });

    describe('array', () => {
      it('should have the same effect for currentIndex=0 as for currentIndex=57', () => {
        const actual = {};
        const expected = {};

        mapper(expected, 'alphabeta', 0, ['betaalpha']);
        mapper(actual, 'alphabeta', 0, ['alphabeta']);

        expect(actual).to.be.eql(expected);
      });
    });
  });
});
