import axios from 'axios';

const SET_PIZZAS = 'SET_PIZZAS';

// Action creator
export const setPizzasAC = (items) => ({
    type: SET_PIZZAS,
    payload: items,
});

// Thunk action creator

// export const fetchPizzas = () => (dispatch) => {
//     axios.get('http://localhost:3001/pizzas').then(({data}) => {
//         dispatch(setPizzasAC(data));
//     })
// };

//Сложность кода обусловлена необходимостью продемонстрировать работу с эмуляцией бэкенда
export const fetchPizzas = () => async (dispatch) => {
    const fetchWithTimeout = (url, timeout = 2000) =>
        Promise.race([
            axios.get(url),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
        ]);

    try {
        const { data: firstData } = await fetchWithTimeout('http://localhost:3001/pizzas');
        if (firstData && firstData.length > 0) {
            dispatch(setPizzasAC(firstData));
        } else {
            throw new Error('No data from first endpoint');
        }
    } catch (error) {
        console.warn('First endpoint failed, trying the second endpoint.', error.message);
        try {
            const { data: secondData } = await axios.get('http://localhost:3000/db.json');
            if (secondData && secondData.pizzas && secondData.pizzas.length > 0) {
                dispatch(setPizzasAC(secondData.pizzas));
            } else {
                console.error('Second endpoint also returned no data.');
            }
        } catch (secondError) {
            console.error('Error fetching from the second endpoint:', secondError);
        }
    }
};
