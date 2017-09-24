var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

	it('should generate expected message', () => {
		var message = generateMessage("Rahul", "This is it");
		
		expect(message.from).toEqual("Rahul");
		expect(message.text).toEqual("This is it");
		expect(message.createdAt).toBeA('number');
	})

})

describe('generateLocationMessage', () => {

	it('should generate location message', () => {
		var message = generateLocationMessage("Rahul", 1, 2);
		
		expect(message.from).toEqual("Rahul");
		expect(message.url).toEqual("https://www.google.com/maps?q=1,2");
		expect(message.createdAt).toBeA('number');
	})

})