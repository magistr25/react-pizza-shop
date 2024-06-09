//reducer
const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};
const getTotalPrice = (array) => {
    return array.reduce((sum, obj) => sum + obj.price, 0)
}

const cart = (state = initialState, action) => {
        switch (action.type) {
            case 'CLEAR_CART':
                return {
                    ...state,
                    items: {},
                    totalPrice: 0,
                    totalCount: 0,

                };
            case 'REMOVE_CART_ITEM':
                const newPizzasItems = {
                    ...state.items
                };
                const currentTotalPrice = newPizzasItems[action.payload].totalPrice;
                const currentTotalCount = newPizzasItems[action.payload].items.length;
                delete newPizzasItems[action.payload];

                return {
                    ...state,
                    items: newPizzasItems,
                    totalPrice: state.totalPrice-currentTotalPrice,
                    totalCount: state.totalCount-currentTotalCount,
                };
            case
            'ADD_PIZZA_TO_CART'
            :
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

            case 'PLUS_CART_ITEM':
                const plusCartItem = [...state.items[action.payload].items, state.items[action.payload].items[0]];

                const plusUpdatedItems = {
                    ...state.items,
                    [action.payload]: {
                        items: plusCartItem,
                        totalPrice: getTotalPrice(plusCartItem),
                    },
                };

                const allPlusPizzas = [].concat.apply([], Object.values(plusUpdatedItems).map(obj => obj.items));
                const plusTotalPrice = getTotalPrice(allPlusPizzas);
                const plusTotalCount = allPlusPizzas.length;

                return {
                    ...state,
                    items: plusUpdatedItems,
                    totalCount: plusTotalCount,
                    totalPrice: plusTotalPrice,
                };

            case 'MINUS_CART_ITEM':
                const currentItems = state.items[action.payload].items;
                const minusCartItem = currentItems.length > 1
                    ? state.items[action.payload].items.slice(1)
                    : [];

                const minusUpdatedItems = minusCartItem.length
                    ? {
                        ...state.items,
                        [action.payload]: {
                            items: minusCartItem,
                            totalPrice: getTotalPrice(minusCartItem),
                        },
                    }
                    : {
                        ...state.items,
                    };

                if (!minusCartItem.length) {
                    delete minusUpdatedItems[action.payload];
                }

                const allMinusPizzas = [].concat.apply([], Object.values(minusUpdatedItems).map(obj => obj.items));
                const minusTotalPrice = getTotalPrice(allMinusPizzas);
                const minusTotalCount = allMinusPizzas.length;

                return {
                    ...state,
                    items: minusUpdatedItems,
                    totalCount: minusTotalCount,
                    totalPrice: minusTotalPrice,
                };


            default:
                return state;
        }
    }
;

export default cart;

