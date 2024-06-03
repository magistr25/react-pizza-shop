import { createStore } from 'redux';
import filters from './reducers/filters';

const store = createStore(filters);

window.store = store; // Для отладки, чтобы иметь доступ к хранилищу в консоли
export default store;

