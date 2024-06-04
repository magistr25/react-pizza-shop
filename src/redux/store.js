import {combineReducers, createStore} from 'redux';
import filters from './reducers/filters';
import pizzas from "./reducers/pizzas";

const rootReducer = combineReducers({
    filters: filters,
    pizzas: pizzas,
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store; // Для отладки, чтобы иметь доступ к хранилищу в консоли
export default store;

