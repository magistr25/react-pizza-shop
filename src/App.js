import React from 'react';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Route, Routes} from "react-router";
import {setPizzasAC} from './redux/reducers/pizzas';


function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            items: state.pizzas.items,
            sortBy: state.filters.sortBy
        };
    })

    React.useEffect(()=> {
        axios.get('http://localhost:3000/db.json')
            .then(({data}) => {
               dispatch(setPizzasAC(data.pizzas));
            });
    },[]);
    return (
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home items={state.items}/>}/>
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
