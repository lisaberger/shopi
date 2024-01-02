import { CATEGORIES_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: CATEGORIES_URL,
            }),
            providesTags: ['Categories'],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
