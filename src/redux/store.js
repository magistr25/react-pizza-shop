import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from "./reducers/rootReducer";

import {thunk} from "redux-thunk";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

window.store = store; // Для отладки, чтобы иметь доступ к хранилищу в консоли
export default store;

