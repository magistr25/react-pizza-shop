const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';
const CLEAR_CART = 'CLEAR_CART';


//action-creators
export const addPizzaToCart = (pizzaObj) => ({
    type: ADD_PIZZA_TO_CART,
    payload: pizzaObj
});

export const clearCart = () => ({
    type: CLEAR_CART,
});
