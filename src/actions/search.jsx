export const addSearch = data => ({
	type: 'ADD_SEARCH',
	title: data.Title,
	description: data.Plot,
	key: data.imdbID
});