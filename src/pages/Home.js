import React from 'react';
import {Categories, SortPopup, PizzaBlock } from "../components";
import {useSelector} from "react-redux";


const Home = () => {
    const {items} = useSelector((state) => {
        return {
            items: state.pizzas.items,

        };
    })
    return (
        <div className="container">
            <div className="content__top">
                <Categories items={[
                    'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'
                ]}/>
                <SortPopup items={[
                    {name:'популярности', type: 'popular'},
                    {name:'цене', type: 'price'},
                    {name:'алфавиту', type: 'alphabet'}
                ]}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                   items && items.map((obj, index) =>
                        <PizzaBlock
                        key={obj.id}
                        name={obj.name}
                        imageUrl={obj.imageUrl}
                        types={obj.types}
                        sizes={obj.sizes}
                        price={obj.price}
                        category={obj.category}
                        rating={obj.rating}

                        // {...obj} - то же самое (кроме key)
                        />

                    )
                }


            </div>
        </div>
    )
}

export default Home;
