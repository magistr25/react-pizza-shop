import React, { useState } from 'react';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!cardNumber || !expiryDate || !cvc || !name) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        // Здесь вы можете добавить валидацию данных карты

        setSuccess(true);
        setError('');
        console.log({
            cardNumber,
            expiryDate,
            cvc,
            name
        });

        // Здесь можно отправить данные на сервер для обработки платежа
    };

    return (
        <div className="payment-page">
            <h2>Оплата</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя на карте</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="cardNumber">Номер карты</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="expiryDate">Срок действия (MM/YY)</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="cvc">CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                    />
                </div>
                <button type="submit">Оплатить</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">Оплата прошла успешно!</div>}
            </form>
        </div>
    );
};

export default PaymentPage;

