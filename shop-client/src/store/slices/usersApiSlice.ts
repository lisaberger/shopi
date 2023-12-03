import { apiSlice } from './apiSlice';
import { USERS_URL } from '@/utils/constants';

interface User {
    name: string;
    password: string;
    email: string;
}

interface Login {
    email: string;
    password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        register: build.mutation({
            query: (user: User) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        login: build.mutation({
            query: (user: Login) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: user,
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetUsersQuery } = userApiSlice;
