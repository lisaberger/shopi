import { apiSlice } from './apiSlice';
import { USERS_URL } from '@/utils/constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetUsersQuery } = userApiSlice;
