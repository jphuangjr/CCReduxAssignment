import * as actions from './search'

describe('todo actions', () => {
	it('addTodo should create ADD_SEARCH action', () => {
		expect(actions.addSearch({Title: "test", Plot:"test_d"})).toEqual({
			type: 'ADD_SEARCH',
			title: "test",
			description: 'test_d'
		})
	})
});