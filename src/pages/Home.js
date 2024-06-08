import React from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";

const categoryNames = [
    'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'
];
const sortItems =
    [
        {name:'популярности', type: 'popular'},
        {name:'цене', type: 'price'},
        {name:'алфавиту', type: 'name'}
    ]

const Home = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.pizzas.items)
    const cartItems = useSelector((state) => state.cart.items)
    const isLoaded = useSelector((state) => state.pizzas.isLoaded)
    const {category, sortBy} = useSelector((state) => state.filters)
    console.log(cartItems)

    React.useEffect(() => {
       dispatch(fetchPizzas(sortBy, category));

    }, [category, sortBy]);


    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));

    },[]);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));

    },[]);

    const handleAddPizzaToCart = (obj) => {
        dispatch(addPizzaToCart(obj));
    }

    const pizzasArray = ["Мясные", "Вегетерианские", "Гриль", "Острые", "Закрытые"]
    let pizzasType = pizzasArray[category] ? pizzasArray[category]:"Все"

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup activeSortType={sortBy}
                           onClickSortType={onSelectSortType}
                           items={sortItems}/>
            </div>
            <h2 className="content__title">{pizzasType} пиццы</h2>
            <div className="content__items">
                { isLoaded
                    ? items.map((obj) =>
                        <PizzaBlock
                            onClickAddPizza={handleAddPizzaToCart}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />
                    )
                    :Array(12).fill(0).map((el, index) => <PizzaLoadingBlock  key={index}/>)
                }


            </div>
        </div>
    )
}

export default Home;
