import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { ...item } = action.payload;

            const existingCartItem = state.cartItems.find((x) => x._id === item._id);

            if (existingCartItem) {
                state.cartItems = state.cartItems.map((x) => (x._id === existingCartItem._id ? item : x));
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
