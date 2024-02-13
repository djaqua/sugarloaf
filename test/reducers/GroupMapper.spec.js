const { describe, it } = require('mocha');
const GroupMapper = require('../../lib/reducers/GroupMapper');

/*
 Theory of operation
 -------------------
  See theory of operation in Mapper.spec.js
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

describe('GroupMapper', () => {
  let formatter;
  let mapper;

  beforeEach(() => {
    formatter = new MockFormatter();
    mapper = new GroupMapper(formatter);
  });

  describe('undefined elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, undefined);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, undefined);
      mapper(actual, undefined);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, undefined);
      mapper(actual, undefined);
      formatter.keyCount = 0;
      mapper(actual, undefined);

      expect(actual).to.be.eql(expected);
    });
  });

  describe('null elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, null);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, null);
      mapper(actual, null);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, null);
      mapper(actual, null);
      formatter.keyCount = 0;
      mapper(actual, null);

      expect(actual).to.be.eql(expected);
    });
  });

  describe('string elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, 'alphabeta');

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, 'alphabeta');
      mapper(actual, 'alphabeta');

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, 'alphabeta');
      mapper(actual, 'alphabeta');
      formatter.keyCount = 0;
      mapper(actual, 'alphabeta');

      expect(actual).to.be.eql(expected);
    });
  });

  describe('number elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, 57);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, 57);
      mapper(actual, 57);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, 57);
      mapper(actual, 57);
      formatter.keyCount = 0;
      mapper(actual, 57);

      expect(actual).to.be.eql(expected);
    });
  });

  describe('Date elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, new Date());

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, new Date());
      mapper(actual, new Date());

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, new Date());
      mapper(actual, new Date());
      formatter.keyCount = 0;
      mapper(actual, new Date());

      expect(actual).to.be.eql(expected);
    });
  });

  describe('Array elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, [2, 3, 4]);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, [2, 3, 4]);
      mapper(actual, [2, 3, 4]);

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, [2, 3, 4]);
      mapper(actual, [2, 3, 4]);
      formatter.keyCount = 0;
      mapper(actual, [2, 3, 4]);

      expect(actual).to.be.eql(expected);
    });
  });

  describe('Object elements', () => {
    it("should add the entry 'key0 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'] };

      mapper(actual, { text: 'alphabeta' });

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 1' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0'], key1: ['value1'] };

      mapper(actual, { text: 'alphabeta' });
      mapper(actual, { text: 'alphabeta' });

      expect(actual).to.be.eql(expected);
    });

    it("should add the entries 'key0 = 2' & 'key1 = 1' to the map", () => {
      const actual = {};
      const expected = { key0: ['value0', 'value2'], key1: ['value1'] };

      mapper(actual, { text: 'alphabeta' });
      mapper(actual, { text: 'alphabeta' });
      formatter.keyCount = 0;
      mapper(actual, { text: 'alphabeta' });

      expect(actual).to.be.eql(expected);
    });
  });
});
