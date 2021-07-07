import {createSlice} from '@reduxjs/toolkit';
import {getData} from '../api/api';

export const toDoListSlice = createSlice({
    name: 'toDoList',
    initialState: {
        items: [],
        error: '',
    },
    reducers: {
        addItems: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.items = [...state.items, ...action.payload];
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCheck: (state, action) => {
            state.items.some((post) => {
                if (post.id === action.payload) {
                    post.done = !post.done;
                    return true;
                }
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const {addItems, setError, setCheck, deleteItem} = toDoListSlice.actions;

export const getAsyncItems = () => async (dispatch) => {
    const response = await getData('posts');
    if (response.error === null) {
        dispatch(addItems([...response.data.data]));
        dispatch(setError(''));
    } else {
        const err = String(response.error);
        dispatch(setError(err));
    }
};

export const selectItems = (state) => state.toDoList.items;
export const selectError = (state) => state.toDoList.error;

export default toDoListSlice.reducer;
