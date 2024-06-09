const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

//action-creators
export const addPizzaToCart = (pizzaObj) => ({
    type: ADD_PIZZA_TO_CART,
    payload: pizzaObj
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const removeCartItem = (id) => ({
    type: REMOVE_CART_ITEM,
    payload: id
})
