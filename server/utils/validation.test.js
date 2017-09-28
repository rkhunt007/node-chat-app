var expect = require('expect');
var { isRealString } = require('./validation');

describe('isRealString', () => {

	it('should not allow non-string values', () => {
		var str = 12345;
		var res = isRealString(str)
		expect(res).toBe(false);
	})

	it('should not allow values with only spaces', () => {
		var str = '    ';
		var res = isRealString(str)
		expect(res).toBe(false);
	})

	it('should allow string values', () => {
		var str = 'hello world  ';
		var res = isRealString(str)
		expect(res).toBe(true);
	})

})