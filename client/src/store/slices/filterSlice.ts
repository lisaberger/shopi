import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
    searchInput: string;
}

const initialState: FilterState = {
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
