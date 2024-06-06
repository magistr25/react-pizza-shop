import axios from "axios";
import {setLoadedAC} from "./pizzas";

let SET_SORT_BY = 'SET_SORT_BY';
let SET_CATEGORY = 'SET_CATEGORY';

//action-creators
export const setSortBy = (name) => ({
    type: SET_SORT_BY,
    payload: name
});

export const setCategory = (catIndex) => ({
    type: SET_CATEGORY,
    payload: catIndex
});




