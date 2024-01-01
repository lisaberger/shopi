import { createBrowserRouter } from 'react-router-dom';

// views
import HomePage from '@/pages/HomePage';
import RootPage from '@/pages/RootPage';
import ProductPage from '@/pages/ProductPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import CartPage from '@/pages/CartPage';

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
