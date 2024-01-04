import { IUser, IUserLogin } from '@/utils/types/user.inferface';
import { apiSlice } from './apiSlice';
import { USERS_URL } from '@/utils/constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        register: build.mutation({
            query: (user: IUser) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        login: build.mutation({
            query: (user: IUserLogin) => ({
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
        profile: build.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetUsersQuery, useProfileMutation } = userApiSlice;
