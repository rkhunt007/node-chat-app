var expect = require('expect');
var { Users } = require('./users');

describe('users', () => {

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "123",
			name: "Jen",
			room: "Node"
		}, {
			id: "124",
			name: "Mike",
			room: "React"
		}, {
			id: "125",
			name: "Alex",
			room: "Node"
		}];
	});

	it('should add a user', () => {
		var users = new Users();
		var user = {
			id: "123",
			name: "Andrew",
			room: "A"
		};
		var resUser = users.addUser(user.id, user.name, user.room)
		expect(users.users).toEqual([user]);
	})

	it('should return the Node users', () => {
		var resUserArray = users.getUserList("Node");
		expect(resUserArray).toEqual(['Jen','Alex']);
	})

	it('should return the React users', () => {
		var resUserArray = users.getUserList("React");
		expect(resUserArray).toEqual(['Mike']);
	})

	it('should return a user', () => {
		var user = users.getUser("123");
		expect(user.id).toBe('123');
	})

	it('should not return a user', () => {
		var user = users.getUser('1');
		expect(user).toNotExist();
	})

	it('should remove a user', () => {
		var user = users.removeUser('123');
		expect(user.id).toBe('123');
		expect(users.users.length).toBe(2);
	})

	it('should not remove a user', () => {
		var user = users.removeUser('1');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	})

})