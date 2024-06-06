import axios from 'axios';

const SET_PIZZAS = 'SET_PIZZAS';
const SET_LOADED ='SET_LOADED'
// Action creators

export const setLoadedAC = (payload) => ({
    type: SET_LOADED,
    payload,
});
export const setPizzasAC = (items) => ({
    type: SET_PIZZAS,
    payload: items,
});

// Thunk action creator

// export const fetchPizzas = (sortBy, category) => (dispatch) => {
//     axios.get('http://localhost:3001/pizzas').then(({data}) => {
//         dispatch(setPizzasAC(data));
//     })
// };

//fetchPizzas - при необходимости происходит эмуляция бэкенда
// Thunk action creator
export const fetchPizzas = (sortBy, category) => async (dispatch) => {
    dispatch(setLoadedAC(false));

    const fetchWithTimeout = (url, timeout = 1500) =>
        Promise.race([
            axios.get(url),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
        ]);

    try {
        const firstUrl = category !== null
            ? `http://localhost:3001/pizzas?category=${category}&_sort=${sortBy.type}&_order=asc`
            : `http://localhost:3001/pizzas?_sort=${sortBy.type}&_order=asc`;

        const firstResponse = await fetchWithTimeout(firstUrl);

        console.log('First endpoint response:', firstResponse);

        if (firstResponse.data && firstResponse.data.length > 0) {
            dispatch(setPizzasAC(firstResponse.data));
        } else {
            throw new Error('No data from first endpoint');
        }
    } catch (error) {
        console.warn('First endpoint failed, trying the second endpoint.', error.message);

        try {
            let secondResponse;
            let secondUrl;

            // Build the URL for the second request
            switch (category) {
                case null:
                    secondUrl = 'http://localhost:3000/responses/db2.json';
                    break;
                case 0:
                    secondUrl = 'http://localhost:3000/responses/meat.json';
                    break;
                case 1:
                    secondUrl = 'http://localhost:3000/responses/vegetable.json';
                    break;
                case 2:
                    secondUrl = 'http://localhost:3000/responses/gril.json';
                    break;
                case 3:
                    secondUrl = 'http://localhost:3000/responses/hot.json';
                    break;
                case 4:
                    secondUrl = 'http://localhost:3000/responses/closed.json';
                    break;
                default:
                    secondUrl = 'http://localhost:3000/responses/db2.json';
            }

            secondResponse = await axios.get(secondUrl);

            console.log('Second endpoint response:', secondResponse);

            if (secondResponse.data.pizzas && secondResponse.data.pizzas.length > 0) {
                dispatch(setPizzasAC(secondResponse.data.pizzas));

            } else {
                console.error('Second endpoint also returned no data.');
            }
        } catch (secondError) {
            console.error('Error fetching from the second endpoint:', secondError);
        }
    }

    dispatch(setLoadedAC(true));
};
