import React from 'react';
import {Button} from "./index";



const CartItem = ({id, name,size,type, totalPrice, totalCount, onClickRemoveItem, plusCartItem, minusCartItem}) => {
    const removePizzaItem = () => {
        onClickRemoveItem(id)
    }
    const plusCartPizza = () => {
        plusCartItem(id)
    }

    const minusCartPizza = () => {
        minusCartItem(id)
    }
    return(
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{name}</h3>
                <p>{type} тесто, {size} см.</p>
            </div>
            <div className="cart__item-count">
                <Button onClick={minusCartPizza}className="button button--outline button--circle cart__item-count-minus">
                    −
                </Button>
                <b>{totalCount}</b>
                <Button onClick={plusCartPizza} className="button button--outline button--circle cart__item-count-plus">
                    +
                </Button>
            </div>
            <div className="cart__item-price">
                <b>{totalPrice} ₽</b>
            </div>
            <div className="cart__item-remove">
                <Button  onClick={removePizzaItem} className="button button--outline button--circle">
                    ✖
                </Button>
            </div>
        </div>
    )
}
export default CartItem;
