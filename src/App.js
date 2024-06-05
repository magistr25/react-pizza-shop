import React from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Route, Routes} from "react-router";
import {setPizzasAC} from './redux/reducers/pizzas';


function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchPizzas = async () => {
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 100)
            );

            try {
                const firstRequest = axios.get('http://localhost:3001/pizzas');
                const { data: firstData } = await Promise.race([firstRequest, timeout]);

                if (firstData && firstData.length > 0) {
                    dispatch(setPizzasAC(firstData));
                } else {
                    console.warn('First endpoint returned no data, trying the second endpoint.');
                    const { data: secondData } = await axios.get('http://localhost:3000/db.json');
                    if (secondData && secondData.pizzas && secondData.pizzas.length > 0) {
                        dispatch(setPizzasAC(secondData.pizzas));
                    } else {
                        console.error('Second endpoint also returned no data.');
                    }
                }
            } catch (error) {
                console.error('Error fetching from the first endpoint:', error);
                try {
                    const { data: secondData } = await axios.get('http://localhost:3000/db.json');
                    if (secondData && secondData.pizzas && secondData.pizzas.length > 0) {
                        dispatch(setPizzasAC(secondData.pizzas));
                    } else {
                        console.error('Second endpoint also returned no data or failed.');
                    }
                } catch (secondError) {
                    console.error('Error fetching from the second endpoint:', secondError);
                }
            }
        };

        fetchPizzas();
    }, [dispatch]);





    return (
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>

                </div>
            </div>

        );


}

// class App extends React.Component {
//     componentDidMount() {
//         axios.get('http://localhost:3000/db.json')
//             .then(({data}) => {
//                 this.props.setPizzas(data.pizzas);
//             })
//     }
//
//     render() {
//
//         return (
//             <div className="wrapper">
//                 <Header/>
//                 <div className="content">
//                     <Routes>
//                         <Route path="/" element={<Home items={this.props.items}/>}/>
//                         <Route path="/cart" element={<Cart/>}/>
//                     </Routes>
//
//                 </div>
//             </div>
//
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         items: state.pizzas.items,
//         filters: state.filters,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPizzas: (items) => dispatch(setPizzasAC(items)) // связываем действие с props
//
//     }
// }


export default App;
