import { PRODUCTS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';
import { Product } from '@/utils/types/product.interface';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], object>({
            query: (queries) => ({
                url: PRODUCTS_URL,
                params: { ...queries },
            }),
            providesTags: ['Products'],
        }),
        getProductById: builder.query<Product, string>({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
