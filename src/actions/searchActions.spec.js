import * as actions from './search'

describe('Search actions', () => {
	it('Search should create ADD_SEARCH action', () => {
		expect(actions.addSearch({Title: "test", Plot:"test_d"})).toEqual({
			type: 'ADD_SEARCH',
			title: "test",
			description: 'test_d'
		})
	})
});