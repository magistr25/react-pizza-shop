//reducer
const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload,
            };
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                itemsCount: action.payload
            };
        default:
            return state;
    }
};

export default cart;
