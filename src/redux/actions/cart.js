let ADD_PIZZA_TO_CART = 'ADD_PIZZA_TO_CART';


//action-creators
export const addPizzaToCart = (pizzaObj) => ({
    type: ADD_PIZZA_TO_CART,
    payload: pizzaObj
});

