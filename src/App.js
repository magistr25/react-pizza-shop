import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Route, Routes} from "react-router";
import {setPizzasAC} from './redux/reducers/pizzas';



// function App() {
//     const [pizzas, setPizzas] = useState([]);
//
//     useEffect(() => {
//         axios.get('http://localhost:3000/db.json')
//             .then(({data}) => {
//                 setPizzas(data.pizzas);
//             })
//
//     }, []);
//
//   return (
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home items={pizzas} />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//
//         </div>
//       </div>
//
//
//   );
// }

class App extends React.Component {
    componentDidMount() {
        axios.get('http://localhost:3000/db.json')
            .then(({data}) => {
                this.props.setPizzas(data.pizzas);
            })
    }

    render() {

        return (
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home items={this.props.items}/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>

                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.pizzas.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPizzas: (items) => dispatch(setPizzasAC(items)) // связываем действие с props
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
