const search = (state = [], action) => {
	switch (action.type) {
		case 'ADD_SEARCH':
			return [
				...state,
				{
					title: action.title,
					description: action.description
				}
			];
		default:
			return state
	}
}

export default search