import { PRODUCTS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsQuery } = productsApiSlice;
