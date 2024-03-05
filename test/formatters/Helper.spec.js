const { describe, it } = require('mocha');
const Helper = require('../../lib/helpers/Helper');

describe('lib/mappers/helpers/Helper', () => {
  let helper;
  beforeEach(() => {
    helper = new Helper();
  });

  describe('getIdentity', () => {
    describe('undefined elements', () => {
      describe('undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(helper.getIdentity(undefined)).to.be.equal(undefined);
        });
      });
    });

    describe('null elements', () => {
      it('should return null (object)', () => {
        expect(helper.getIdentity(null)).to.be.equal(null);
      });
    });

    describe('string elements', () => {
      describe('empty strings', () => {
        it("should return '' (string)", () => {
          expect(helper.getIdentity('')).to.be.equal('');
        });
      });
      describe('non-empty strings', () => {
        it("should return 'alphabeta' (string)", () => {
          expect(helper.getIdentity('alphabeta')).to.be.equal('alphabeta');
        });
      });
    });

    describe('number elements', () => {
      describe('negative whole numbers', () => {
        it('should return -1 (number)', () => {
          expect(helper.getIdentity(-1)).to.be.equal(-1);
        });
      });
      describe('negative rational numbers', () => {
        it('should return -0.57 (number)', () => {
          expect(helper.getIdentity(-0.57)).to.be.equal(-0.57);
        });
      });

      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(helper.getIdentity(0)).to.be.equal(0);
        });
      });

      describe('positive rational numbers', () => {
        it('should return 0.57 (number)', () => {
          expect(helper.getIdentity(0.57)).to.be.equal(0.57);
        });
      });

      describe('positive whole numbers', () => {
        it('should return 1 (number)', () => {
          expect(helper.getIdentity(1)).to.be.equal(1);
        });
      });
    });

    describe('number elements', () => {
      describe('negative numbers', () => {
        it('should return -1 (number)', () => {
          expect(helper.getIdentity(-1)).to.be.equal(-1);
        });
      });
      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(helper.getIdentity(0)).to.be.equal(0);
        });
      });
      describe('negative numbers', () => {
        it('should return 1 (number)', () => {
          expect(helper.getIdentity(1)).to.be.equal(1);
        });
      });
    });

    describe('Date elements', () => {
      it('should return 2024-02-09T03:36:51.944Z (Date)', () => {
        const actual = new Date('2024-02-09T03:36:51.944Z');
        const expected = new Date(actual);
        expect(helper.getIdentity(actual)).to.be.eql(expected);
      });
    });

    describe('Array elements', () => {
      it('should return [5,4,3,2,1] (Array)', () => {
        const actual = [5, 4, 3, 2, 1];
        const expected = [5, 4, 3, 2, 1];
        expect(helper.getIdentity(actual)).to.be.eql(expected);
      });
    });

    describe('Object elements', () => {
      it("should return {a:'alpha', b:'beta', c:57} (Object)", () => {
        const actual = { a: 'alpha', b: 'beta', c: 57 };
        const expected = { a: 'alpha', b: 'beta', c: 57 };
        expect(helper.getIdentity(actual)).to.be.eql(expected);
      });
    });
  });

  describe('transform', () => {
    describe('undefined elements', () => {
      // TODO possibly redundant -- is there a way to check if a parameter is explicitely undefined?
      describe('explicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(helper.transform(undefined)).to.be.equal(undefined);
        });
      });
      describe('implicitly undefined elements', () => {
        it('should return undefined (undefined)', () => {
          expect(helper.transform()).to.be.equal(undefined);
        });
      });
    });

    describe('null elements', () => {
      it('should return null (object)', () => {
        expect(helper.transform(null)).to.be.equal(null);
      });
    });
    describe('string elements', () => {
      describe('empty strings', () => {
        it("should return '' (string)", () => {
          expect(helper.transform('')).to.be.equal('');
        });
      });
      describe('non-empty strings', () => {
        it("should return 'alphabeta' (string)", () => {
          expect(helper.transform('alphabeta')).to.be.equal('alphabeta');
        });
      });
    });
    describe('number elements', () => {
      describe('negative whole numbers', () => {
        it('should return -1 (number)', () => {
          expect(helper.transform(-1)).to.be.equal(-1);
        });
      });
      describe('negative rational numbers', () => {
        it('should return -0.57 (number)', () => {
          expect(helper.transform(-0.57)).to.be.equal(-0.57);
        });
      });

      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(helper.transform(0)).to.be.equal(0);
        });
      });

      describe('positive rational numbers', () => {
        it('should return 0.57 (number)', () => {
          expect(helper.transform(0.57)).to.be.equal(0.57);
        });
      });

      describe('positive whole numbers', () => {
        it('should return 1 (number)', () => {
          expect(helper.transform(1)).to.be.equal(1);
        });
      });
    });

    describe('number elements', () => {
      describe('negative numbers', () => {
        it('should return -1 (number)', () => {
          expect(helper.transform(-1)).to.be.equal(-1);
        });
      });
      describe('zero', () => {
        it('should return 0 (number)', () => {
          expect(helper.transform(0)).to.be.equal(0);
        });
      });
      describe('negative numbers', () => {
        it('should return 1 (number)', () => {
          expect(helper.transform(1)).to.be.equal(1);
        });
      });
    });

    describe('Date elements', () => {
      it('should return 2024-02-09T03:36:51.944Z (Date)', () => {
        const actual = new Date('2024-02-09T03:36:51.944Z');
        const expected = new Date(actual);
        expect(helper.transform(actual)).to.be.eql(expected);
      });
    });

    describe('Array elements', () => {
      it('should return [5,4,3,2,1] (Array)', () => {
        const actual = [5, 4, 3, 2, 1];
        const expected = [5, 4, 3, 2, 1];
        expect(helper.transform(actual)).to.be.eql(expected);
      });
    });

    describe('Object elements', () => {
      it("should return {a:'alpha', b:'beta', c:57} (Object)", () => {
        const actual = { a: 'alpha', b: 'beta', c: 57 };
        const expected = { a: 'alpha', b: 'beta', c: 57 };
        expect(helper.transform(actual)).to.be.eql(expected);
      });
    });
  });
});
