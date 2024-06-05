import React from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
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
    const {category, sortBy} = useSelector((state) => state.filters)

    React.useEffect(() => {
       dispatch(fetchPizzas());

    }, [category]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));

    },[]);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));

    },[]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={catgoryNames}/>
                <SortPopup activeSortType={sortBy}
                           onClickSortType={onSelectSortType}
                           items={sortItems}/>
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
                    :Array(12).fill(0).map((el, index) => <PizzaLoadingBlock  key={index}/>)
                }


            </div>
        </div>
    )
}

export default Home;
