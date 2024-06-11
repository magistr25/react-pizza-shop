import React from 'react';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Route, Routes } from 'react-router';
import PaymentPage from "./pages/PaymentPage";
import './scss/components/_paymentPages.scss';


function App() {

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>

                    <Route path="/react-pizza-shop/" element={<Home />} />
                    <Route path="/react-pizza-shop/cart" element={<Cart />} />
                    <Route path="/react-pizza-shop/payment" element={<PaymentPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
