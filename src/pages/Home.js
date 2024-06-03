import React from 'react';
import {Categories, SortPopup, PizzaBlock } from "../components";


const Home = ({items}) => {
    return (
        <div className="container">
            <div className="content__top">
                <Categories items={[
                    'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'
                ]}/>
                <SortPopup items={[
                    'популярности', 'цене', 'алфавиту'
                ]}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    items.map((obj, index) =>
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
