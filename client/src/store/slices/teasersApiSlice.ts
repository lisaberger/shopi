import { TEASERS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';

export const teasersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeasers: builder.query({
            query: () => ({
                url: TEASERS_URL,
            }),
            providesTags: ['Teasers'],
        }),
    }),
});

export const { useGetTeasersQuery } = teasersApiSlice;
