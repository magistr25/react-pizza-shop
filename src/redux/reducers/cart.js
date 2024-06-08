//reducer
const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};
const getTotalPrice = (array) => {
    return array.reduce((sum, obj) => sum + obj.price, 0)}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {
                ...state,
                items: {},
                totalPrice: 0,
                totalCount: 0,
            };
        case 'ADD_PIZZA_TO_CART':
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                },
            };

            // Собираем все пиццы в один массив для подсчета общей стоимости и количества
            const allPizzas = [].concat.apply([], Object.values(newItems).map(obj => obj.items));
            const totalPrice = getTotalPrice(allPizzas);
            const totalCount = allPizzas.length;

            return {
                ...state,
                items: newItems,
                totalCount: totalCount,
                totalPrice: totalPrice,
            };

        default:
            return state;
    }
};

export default cart;

