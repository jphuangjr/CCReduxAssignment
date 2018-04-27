import search from './search'

describe('Search Reducer', () => {
	it('Should handle initial state', () => {
		expect(
				search(undefined, {})
		).toEqual([])
	});

	it('should handle ADD_SEARCH', () => {
		expect(
				search([], {
					type: 'ADD_SEARCH',
					title: "Test Title",
					description: "Test Description"
				})
		).toEqual([
			{
				title: "Test Title",
				description: "Test Description"
			}
		])

		expect(
				search([
					{
						title: "Test Title 1",
						description: "Test Description 1"
					}
				], {
					type: 'ADD_SEARCH',
					title: "Test Title 2",
					description: "Test Description 2"
				})
		).toEqual([
			{
				title: "Test Title 1",
				description: "Test Description 1"
			}, {
				title: "Test Title 2",
				description: "Test Description 2"
			}
		])
	})

})