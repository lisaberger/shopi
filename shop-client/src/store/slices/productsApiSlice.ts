import { PRODUCTS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';
import { Product } from '@/utils/types/product.interface';

type QueryObject = {
    [key: string]: string;
};

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], QueryObject>({
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
