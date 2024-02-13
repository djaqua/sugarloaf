const { describe, it } = require('mocha');
const Formatter = require('./../../lib/formatters/Formatter');

describe('lib/mappers/formatters/Formatter', () => {
  let formatter;
  beforeEach(() => {
    formatter = new Formatter();
  });

  describe('toKey', () => {
    describe('undefined elements', () => {
      // TODO possibly redundant -- is there a way to check if a parameter is explicitely undefined?
      describe('explicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(formatter.toKey(undefined)).to.be.equal(undefined);
        });
      });
      describe('implicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(formatter.toKey()).to.be.equal(undefined);
        });
      });
    });

    describe('null elements', () => {
      it('should return null (object)', () => {
        expect(formatter.toKey(null)).to.be.equal(null);
      });
    });

    describe('string elements', () => {
      describe('empty strings', () => {
        it("should return '' (string)", () => {
          expect(formatter.toKey('')).to.be.equal('');
        });
      });
      describe('non-empty strings', () => {
        it("should return 'alphabeta' (string)", () => {
          expect(formatter.toKey('alphabeta')).to.be.equal('alphabeta');
        });
      });
    });

    describe('number elements', () => {
      describe('negative whole numbers', () => {
        it('should return -1 (number)', () => {
          expect(formatter.toKey(-1)).to.be.equal(-1);
        });
      });
      describe('negative rational numbers', () => {
        it('should return -0.57 (number)', () => {
          expect(formatter.toKey(-0.57)).to.be.equal(-0.57);
        });
      });

      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(formatter.toKey(0)).to.be.equal(0);
        });
      });

      describe('positive rational numbers', () => {
        it('should return 0.57 (number)', () => {
          expect(formatter.toKey(0.57)).to.be.equal(0.57);
        });
      });

      describe('positive whole numbers', () => {
        it('should return 1 (number)', () => {
          expect(formatter.toKey(1)).to.be.equal(1);
        });
      });
    });

    describe('number elements', () => {
      describe('negative numbers', () => {
        it('should return -1 (number)', () => {
          expect(formatter.toKey(-1)).to.be.equal(-1);
        });
      });
      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(formatter.toKey(0)).to.be.equal(0);
        });
      });
      describe('negative numbers', () => {
        it('should return 1 (number)', () => {
          expect(formatter.toKey(1)).to.be.equal(1);
        });
      });
    });

    describe('Date elements', () => {
      it('should return 2024-02-09T03:36:51.944Z (Date)', () => {
        const actual = new Date('2024-02-09T03:36:51.944Z');
        const expected = new Date(actual);
        expect(formatter.toKey(actual)).to.be.eql(expected);
      });
    });

    describe('Array elements', () => {
      it('should return [5,4,3,2,1] (Array)', () => {
        const actual = [5, 4, 3, 2, 1];
        const expected = [5, 4, 3, 2, 1];
        expect(formatter.toKey(actual)).to.be.eql(expected);
      });
    });

    describe('Object elements', () => {
      it("should return {a:'alpha', b:'beta', c:57} (Object)", () => {
        const actual = { a: 'alpha', b: 'beta', c: 57 };
        const expected = { a: 'alpha', b: 'beta', c: 57 };
        expect(formatter.toKey(actual)).to.be.eql(expected);
      });
    });
  });

  describe('toValue', () => {
    describe('undefined elements', () => {
      // TODO possibly redundant -- is there a way to check if a parameter is explicitely undefined?
      describe('explicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(formatter.toValue(undefined)).to.be.equal(undefined);
        });
      });
      describe('implicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(formatter.toValue()).to.be.equal(undefined);
        });
      });
    });

    describe('null elements', () => {
      it('should return null (object)', () => {
        expect(formatter.toValue(null)).to.be.equal(null);
      });
    });
    describe('string elements', () => {
      describe('empty strings', () => {
        it("should return '' (string)", () => {
          expect(formatter.toValue('')).to.be.equal('');
        });
      });
      describe('non-empty strings', () => {
        it("should return 'alphabeta' (string)", () => {
          expect(formatter.toValue('alphabeta')).to.be.equal('alphabeta');
        });
      });
    });
    describe('number elements', () => {
      describe('negative whole numbers', () => {
        it('should return -1 (number)', () => {
          expect(formatter.toValue(-1)).to.be.equal(-1);
        });
      });
      describe('negative rational numbers', () => {
        it('should return -0.57 (number)', () => {
          expect(formatter.toValue(-0.57)).to.be.equal(-0.57);
        });
      });

      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(formatter.toValue(0)).to.be.equal(0);
        });
      });

      describe('positive rational numbers', () => {
        it('should return 0.57 (number)', () => {
          expect(formatter.toValue(0.57)).to.be.equal(0.57);
        });
      });

      describe('positive whole numbers', () => {
        it('should return 1 (number)', () => {
          expect(formatter.toValue(1)).to.be.equal(1);
        });
      });
    });

    describe('number elements', () => {
      describe('negative numbers', () => {
        it('should return -1 (number)', () => {
          expect(formatter.toValue(-1)).to.be.equal(-1);
        });
      });
      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(formatter.toValue(0)).to.be.equal(0);
        });
      });
      describe('negative numbers', () => {
        it('should return 1 (number)', () => {
          expect(formatter.toValue(1)).to.be.equal(1);
        });
      });
    });

    describe('Date elements', () => {
      it('should return 2024-02-09T03:36:51.944Z (Date)', () => {
        const actual = new Date('2024-02-09T03:36:51.944Z');
        const expected = new Date(actual);
        expect(formatter.toValue(actual)).to.be.eql(expected);
      });
    });

    describe('Array elements', () => {
      it('should return [5,4,3,2,1] (Array)', () => {
        const actual = [5, 4, 3, 2, 1];
        const expected = [5, 4, 3, 2, 1];
        expect(formatter.toValue(actual)).to.be.eql(expected);
      });
    });

    describe('Object elements', () => {
      it("should return {a:'alpha', b:'beta', c:57} (Object)", () => {
        const actual = { a: 'alpha', b: 'beta', c: 57 };
        const expected = { a: 'alpha', b: 'beta', c: 57 };
        expect(formatter.toValue(actual)).to.be.eql(expected);
      });
    });
  });
});
