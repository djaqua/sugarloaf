const { describe, it } = require('mocha');

const DateHelper = require('../../lib/helpers/DateHelper');

describe('lib/mappers/helpers/DateHelper', () => {
  describe('default constructor', () => {
    let helper;
    beforeEach(() => {
      helper = new DateHelper();
    });
    describe('getIdentity', () => {
      describe('undefined elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toISOString')", () => {
          expect(() => {
            helper.getIdentity(undefined);
          }).to.throw("Cannot read properties of undefined (reading 'toISOString')");
        });
      });

      describe('null elements', () => {
        it("should throw TypeError: Cannot read properties of null (reading 'toISOString')", () => {
          expect(() => {
            helper.getIdentity(null);
          }).to.throw("Cannot read properties of null (reading 'toISOString')");
        });
      });

      describe('string elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity('alphabeta');
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('number elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity(57);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Date elements', () => {
        it("should return 'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)' (string)", () => {
          const expected = '2024-02-09T03:36:51.944Z';
          expect(helper.getIdentity(new Date(expected))).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity([2, 3, 4]);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Object elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('date.toISOString is not a function');
        });
      });
    });

    describe('transform', () => {
      describe('undefined elements', () => {
        it('should return undefined', () => {
          expect(helper.transform(undefined)).to.be.eql(undefined);
        });
      });

      describe('null elements', () => {
        it('should return null', () => {
          expect(helper.transform(null)).to.be.eql(null);
        });
      });

      describe('string elements', () => {
        it("should return 'alphabeta'", () => {
          expect(helper.transform('alphabeta')).to.be.eql('alphabeta');
        });
      });

      describe('number elements', () => {
        it('should return 57', () => {
          expect(helper.transform(57)).to.be.eql(57);
        });
      });

      describe('Date elements', () => {
        it('should return 2024-02-09T03:36:51.944Z (Date)', () => {
          const expected = new Date('2024-02-09T03:36:51.944Z');
          expect(helper.transform(new Date(expected))).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it('should return [2,3,4] (Array)', () => {
          const expected = [2, 3, 4];
          expect(helper.transform([...expected])).to.be.eql(expected);
        });
      });

      describe('Object elements', () => {
        it("should return { a: 'alpha', b: 'beta', c: 57 } (Object)", () => {
          const expected = { a: 'alpha', b: 'beta', c: 57 };
          expect(helper.transform({ ...expected })).to.be.eql(expected);
        });
      });
    });
  });

  describe('constructor with identityFormatter specified', () => {
    let helper;

    beforeEach(() => {
      helper = new DateHelper({
        identityFormatter: Intl.DateTimeFormat('en-US'),
      });
    });

    describe('getIdentity', () => {
      describe('undefined elements', () => {
        it('should return the current date in MM/DD/YYYY format', () => {
          expect(helper.getIdentity(undefined)).to.be.equal(
            Intl.DateTimeFormat('en-US').format(new Date())
          );
        });
      });

      describe('null elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(null)).to.be.equal('12/31/1969');
        });
      });

      describe('string elements', () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            helper.getIdentity('alphabeta');
          }).to.throw('Invalid time value');
        });
      });

      describe('number elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(0)).to.be.equal('12/31/1969');
        });

        it("should return '1/1/1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(100000000)).to.be.equal('1/1/1970');
        });
      });

      describe('Date elements', () => {
        it("should return '2/8/2024' (string)", () => {
          expect(helper.getIdentity(new Date('2024-02-09T03:36:51.944Z'))).to.be.eql('2/8/2024');
        });
      });

      describe('Array elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.getIdentity([2, 3, 4]);
          }).to.throw('Invalid time value');
        });
      });

      describe('Object elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.getIdentity({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('Invalid time value');
        });
      });
    });

    describe('transform', () => {
      describe('undefined elements', () => {
        it('should return undefined', () => {
          expect(helper.transform(undefined)).to.be.equal(undefined);
        });
      });

      describe('null elements', () => {
        it('should return null', () => {
          expect(helper.transform(null)).to.be.equal(null);
        });
      });

      describe('string elements', () => {
        it("should return 'alphabeta'", () => {
          expect(helper.transform('alphabeta')).to.be.equal('alphabeta');
        });
      });

      describe('number elements', () => {
        it('should return 57', () => {
          expect(helper.transform(57)).to.be.equal(57);
        });
      });

      describe('Date elements', () => {
        it('should return null', () => {
          const expected = new Date('2024-02-09T03:36:51.944Z');
          expect(helper.transform(new Date(expected))).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it('should return [2, 3, 4]', () => {
          expect(helper.transform([2, 3, 4])).to.be.eql([2, 3, 4]);
        });
      });

      describe('Object elements', () => {
        it("should return { a: 'alpha', b: 'beta', c: 57 }", () => {
          expect(helper.transform({ a: 'alpha', b: 'beta', c: 57 })).to.be.eql({
            a: 'alpha',
            b: 'beta',
            c: 57,
          });
        });
      });
    });
  });

  describe('constructor with transformFormatter specified', () => {
    let helper;

    beforeEach(() => {
      helper = new DateHelper({
        transformFormatter: Intl.DateTimeFormat('en-US'),
      });
    });

    describe('getIdentity', () => {
      describe('undefined elements', () => {
        it("should throw TypeError: Cannot read properties of undefined (reading 'toISOString')", () => {
          expect(() => {
            helper.getIdentity(undefined);
          }).to.throw("Cannot read properties of undefined (reading 'toISOString')");
        });
      });

      describe('null elements', () => {
        it("should throw TypeError: Cannot read properties of null (reading 'toISOString')", () => {
          expect(() => {
            helper.getIdentity(null);
          }).to.throw("Cannot read properties of null (reading 'toISOString')");
        });
      });

      describe('string elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity('alphabeta');
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('number elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity(57);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Date elements', () => {
        it("should return 'Thu Feb 08 2024 22:36:51 GMT-0500 (Eastern Standard Time)' (string)", () => {
          const expected = '2024-02-09T03:36:51.944Z';
          expect(helper.getIdentity(new Date(expected))).to.be.eql(expected);
        });
      });

      describe('Array elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity([2, 3, 4]);
          }).to.throw('date.toISOString is not a function');
        });
      });

      describe('Object elements', () => {
        it("should throw 'date.toISOString is not a function'", () => {
          expect(() => {
            helper.getIdentity({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('date.toISOString is not a function');
        });
      });
    });

    describe('transform', () => {
      describe('undefined elements', () => {
        it('should return the current date in MM/DD/YYYY format', () => {
          expect(helper.transform(undefined)).to.be.equal(
            Intl.DateTimeFormat('en-US').format(new Date())
          );
        });
      });

      describe('null elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(null)).to.be.equal('12/31/1969');
        });
      });

      describe('string elements', () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            helper.transform('alphabeta');
          }).to.throw('Invalid time value');
        });
      });

      describe('number elements', () => {
        it("should return '12/31/1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(0)).to.be.equal('12/31/1969');
        });

        it("should return '1/1/1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(100000000)).to.be.equal('1/1/1970');
        });
      });

      describe('Date elements', () => {
        it("should return '2/8/2024' (string)", () => {
          expect(helper.transform(new Date('2024-02-09T03:36:51.944Z'))).to.be.eql('2/8/2024');
        });
      });

      describe('Array elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.transform([2, 3, 4]);
          }).to.throw('Invalid time value');
        });
      });

      describe('Object elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.transform({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('Invalid time value');
        });
      });
    });
  });

  describe('constructor with both identityFormatter and transformFormatter specified', () => {
    let helper;

    beforeEach(() => {
      // keyFormat =
      helper = new DateHelper({
        identityFormatter: Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
        }),
        transformFormatter: Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }),
      });
    });

    describe('getIdentity', () => {
      describe('undefined elements', () => {
        it('should return the current date in MM/DD/YYYY format', () => {
          expect(helper.getIdentity(undefined)).to.be.equal(
            Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(new Date())
          );
        });
      });

      describe('null elements', () => {
        it("should return '12/31/69' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(null)).to.be.equal('12/31/69');
        });
      });

      describe('string elements', () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            helper.getIdentity('alphabeta');
          }).to.throw('Invalid time value');
        });
      });

      describe('number elements', () => {
        it("should return '12/31/69' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(0)).to.be.equal('12/31/69');
        });

        it("should return '1/1/70' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.getIdentity(100000000)).to.be.equal('1/1/70');
        });
      });

      describe('Date elements', () => {
        it("should return '2/8/24' (string)", () => {
          expect(helper.getIdentity(new Date('2024-02-09T03:36:51.944Z'))).to.be.eql('2/8/24');
        });
      });

      describe('Array elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.getIdentity([2, 3, 4]);
          }).to.throw('Invalid time value');
        });
      });

      describe('Object elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.getIdentity({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('Invalid time value');
        });
      });
    });

    describe('transform', () => {
      describe('undefined elements', () => {
        it('should return the current date in MM/DD/YYYY format', () => {
          expect(helper.transform(undefined)).to.be.equal(
            Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date())
          );
        });
      });

      describe('null elements', () => {
        it("should return 'December 31, 1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(null)).to.be.eql('December 31, 1969');
        });
      });

      describe('string elements', () => {
        it("should throw 'Uncaught RangeError: Invalid time value'", () => {
          expect(() => {
            helper.transform('alphabeta');
          }).to.throw('Invalid time value');
        });
      });

      describe('number elements', () => {
        it("should return 'December 31, 1969' (the day before the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(0)).to.be.equal('December 31, 1969');
        });

        it("should return 'January 1, 1970' (the Unix epoch) in MM/DD/YYYY format", () => {
          expect(helper.transform(100000000)).to.be.equal('January 1, 1970');
        });
      });

      describe('Date elements', () => {
        it("should return 'February 8, 2024' (string)", () => {
          expect(helper.transform(new Date('2024-02-09T03:36:51.944Z'))).to.be.eql(
            'February 8, 2024'
          );
        });
      });

      describe('Array elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.transform([2, 3, 4]);
          }).to.throw('Invalid time value');
        });
      });

      describe('Object elements', () => {
        it("should throw 'Invalid time value'", () => {
          expect(() => {
            helper.transform({ a: 'alpha', b: 'beta', c: 57 });
          }).to.throw('Invalid time value');
        });
      });
    });
  });
});
