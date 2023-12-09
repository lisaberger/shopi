import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchInput: '',
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
    },
});

export const { setSearchInput } = filterSlice.actions;

export default filterSlice.reducer;
