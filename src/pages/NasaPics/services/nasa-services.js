import { loadData, loadError, setData } from './nasa-actions';

const fetchUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5';

const getData = () => (dispatch) => {
    loadData();
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((res) => {
            dispatch(setData(res));
        })
        .catch((err) => {
            dispatch(loadError(err.message));
        });
};

const initialState = {
    isLoading: false,
    data: {
        title: '',
        url: '',
        date: '',
        explanation: '',
    },
    erorr: null,
};

export { getData, initialState };
