import { apiSlice } from './apiSlice';
import { USERS_URL } from '@/utils/constants';

interface User {
    name: string;
    password: string;
    email: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        register: builder.mutation({
            query: (user: User) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user: User) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetUsersQuery, useRegisterMutation } = userApiSlice;
