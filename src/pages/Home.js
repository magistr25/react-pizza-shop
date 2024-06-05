import React from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";

const catgoryNames = [
    'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'
];
const sortItems =
    [
        {name:'популярности', type: 'popular'},
        {name:'цене', type: 'price'},
        {name:'алфавиту', type: 'alphabet'}
    ]

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.pizzas.items)
    const isLoaded = useSelector((state) => state.pizzas.isLoaded)

    const onSelectCategory = (index) => {
        dispatch(setCategory(index));

    }

    React.useEffect(() => {
        if(!items.length){
            dispatch(fetchPizzas());
        }
    }, []);


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickItem={onSelectCategory}
                    items={catgoryNames}/>
                <SortPopup items={sortItems}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoaded
                    ? items.map((obj) =>
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
                    :Array(12).fill(<PizzaLoadingBlock />)
                }


            </div>
        </div>
    )
}

export default Home;
