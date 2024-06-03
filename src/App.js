import React, {useEffect, useState} from 'react';
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Route, Routes} from "react-router";


function App() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/db.json')
            .then(response => {
                return response.json();
            })
            .then(json => {
                 setPizzas(json.pizzas);
                 ;
            })

    }, []);
    console.log(pizzas)
  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home items={pizzas} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>



        </div>
      </div>


  );
}

export default App;
