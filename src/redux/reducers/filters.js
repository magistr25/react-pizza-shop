let SET_SORT_BY = 'SET_SORT_BY';
let SET_CATEGORY = 'SET_CATEGORY';



const initialState = {
    category: 0,
    sortBy: 'popular'
}


//reducer
const filters = (state=initialState, action) =>{
    if (action.type==='SET_SORT_BY'){
        return {
            ...state,
            sortBy: action.payload,
        };
    }

    return state;
};



//action-creators
export const setSortBy = (name) => ({
    type: SET_SORT_BY,
    payload: name
});

export const setCategory = (catIndex) => ({
    type: SET_CATEGORY,
    payload: catIndex
});


export default filters
