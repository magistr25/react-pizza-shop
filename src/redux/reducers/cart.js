//reducer
const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const cart = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_PIZZA_TO_CART':
                const newItems = {
                    ...state.items,
                    [action.payload.id]: !state.items[action.payload.id]
                        ? [action.payload]
                        : [...state.items[action.payload.id], action.payload],
                }
                return {
                    ...state,
                    items: newItems,
                    totalCount:[].concat.apply([], Object.values(newItems)).length,
                    totalPrice: ([].concat.apply([], Object.values(newItems))) //массив пицц, положенных в корзину
                        .reduce((sum, obj) => sum + obj.price, 0),

                };

            default:
                return state;
        }
    }
;

export default cart;
