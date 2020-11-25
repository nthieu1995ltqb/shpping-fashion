const defaultState = {
	categories: [],
}

const categories=(state=defaultState, action)=>{
    switch(action.type){
		case "FETCH_CATEGORIES":
			state.categories = action.categories
			return {...state}          
        default:
            return {...state};
    }
}

export default categories;