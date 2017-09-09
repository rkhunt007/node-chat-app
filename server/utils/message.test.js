var expect = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {

	it('should generate expected message', () => {
		var message = generateMessage("Rahul", "This is it");
		
		expect(message.from).toEqual("Rahul");
		expect(message.text).toEqual("This is it");
		expect(message.createdAt).toBeA('number');
	})

})