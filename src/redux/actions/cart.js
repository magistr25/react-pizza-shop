const ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';
const CLEAR_CART = 'CLEAR_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const MINUS_CART_ITEM = 'MINUS_CART_ITEM';
const PLUS_CART_ITEM = 'PLUS_CART_ITEM';

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

export const minusCartItem = (id) => ({
    type: MINUS_CART_ITEM,
    payload: id
})
export const plusCartItem = (id) => ({
    type: PLUS_CART_ITEM,
    payload: id
})

