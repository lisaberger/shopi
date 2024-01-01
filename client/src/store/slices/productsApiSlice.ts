import { PRODUCTS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';
import { Product } from '@/utils/types/product.interface';

interface Query {
    search: string;
    category: string[];
}

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], Query[]>({
            query: (query) => ({
                url: PRODUCTS_URL,
                params: query,
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