import { ICartItem } from '@/utils/types/cart.interface';
import { createSlice } from '@reduxjs/toolkit';
interface WishlistState {
    wishlistItems: ICartItem[];
}

const initialState: WishlistState = localStorage.getItem('wishlist') ? JSON.parse(String(localStorage.getItem('wishlist'))) : { wishlistItems: [] };

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const { ...item } = action.payload;

            const existingWishlistItem = state.wishlistItems.find((wishlistItem) => wishlistItem._id === item._id);

            if (existingWishlistItem) {
                state.wishlistItems = state.wishlistItems.map((wishlistItem) =>
                    wishlistItem._id === existingWishlistItem._id ? item : wishlistItem
                );
            } else {
                state.wishlistItems = [...state.wishlistItems, item];
            }

            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((wishlistItems) => wishlistItems._id !== action.payload);

            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        clearWishlistItems: (state) => {
            state.wishlistItems = [];
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;
