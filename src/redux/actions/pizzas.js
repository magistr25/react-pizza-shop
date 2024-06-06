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
//     dispatch({
//         type: SET_LOADED,
//         payload: false
//     });
//     axios.get(`http://localhost:3001/pizzas?category=${category}&_sort=${sortBy.type}&_order=desc`).then(({data}) => {
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
            ? `http://localhost:3001/pizzas?category=${category}&_sort=${sortBy}&_order=desc`
            : `http://localhost:3001/pizzas?_sort=${sortBy}&_order=asc`;

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
                    if(sortBy==='name') secondUrl = 'http://localhost:3000/responses/sortAlphabet.json';
                    if(sortBy==='price') secondUrl = 'http://localhost:3000/responses/sortPrice.json';
                    if(sortBy==='popular') secondUrl = 'http://localhost:3000/responses/sortPopup.json';
                    break;
                case 0:
                    if(sortBy==='name') secondUrl = 'http://localhost:3000/responses/sortAlphabet_0.json';
                    if(sortBy==='price') secondUrl = 'http://localhost:3000/responses/sortPrice_0.json';
                    if(sortBy==='popular') secondUrl = 'http://localhost:3000/responses/sortPopup_0.json';
                    break;
                case 1:
                    if(sortBy==='name') secondUrl = 'http://localhost:3000/responses/sortAlphabet_1.json';
                    if(sortBy==='price') secondUrl = 'http://localhost:3000/responses/sortPrice_1.json';
                    if(sortBy==='popular') secondUrl = 'http://localhost:3000/responses/sortPopup_1.json';
                    break;
                case 2:
                    if(sortBy==='name') secondUrl = 'http://localhost:3000/responses/sortAlphabet_2.json';
                    if(sortBy==='price') secondUrl = 'http://localhost:3000/responses/sortPrice_2.json';
                    if(sortBy==='popular') secondUrl = 'http://localhost:3000/responses/sortPopup_2.json';
                    break;
                case 3:
                    if(sortBy==='name') secondUrl = 'http://localhost:3000/responses/sortAlphabet_3.json';
                    if(sortBy==='price') secondUrl = 'http://localhost:3000/responses/sortPrice_3.json';
                    if(sortBy==='popular') secondUrl = 'http://localhost:3000/responses/sortPopup_3.json';
                    break;
                case 4:
                    secondUrl = 'http://localhost:3000/responses/closed.json';
                    break;
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
