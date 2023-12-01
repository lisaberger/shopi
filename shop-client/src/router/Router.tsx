import { createBrowserRouter } from 'react-router-dom';

// views
import HomePage from '../pages/HomePage';
import RootPage from '../pages/RootPage';
import ProductPage from '@/pages/ProductPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            { index: true, path: '/', element: <HomePage /> },
            { path: '/login', element: <HomePage /> },
            { path: '/product/:productId', element: <ProductPage /> },
        ],
    },
]);

export default router;
