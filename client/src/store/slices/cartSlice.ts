import { CartItem } from '@/utils/types/cart.interface';
import { createSlice } from '@reduxjs/toolkit';
interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = localStorage.getItem('cart') ? JSON.parse(String(localStorage.getItem('cart'))) : { cartItems: [] };

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
        clearCartItems: (state) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
