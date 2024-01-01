import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const RootPage = lazy(() => import('@/pages/RootPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            { index: true, path: '/', element: <HomePage /> },
            { path: '/product/:id', element: <ProductPage /> },
            { path: '/cart', element: <CartPage /> },
            { path: '/register', element: <RegisterPage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/profile', element: <ProfilePage /> },
        ],
    },
]);

export default router;
