let SET_PIZZAS='SET_PIZZAS'


const initialState = {
    items: [],
    isLoaded: false,
}


//reducer
const pizzas = (state=initialState, action) =>{
    if (action.type==='SET_PIZZAS'){
        return {
            ...state,
            items: action.payload,
        };
    }
     return state;
};



//action-creators
export const setPizzas = (items) => ({
    type: SET_PIZZAS,
    payload: items
});

export default pizzas
