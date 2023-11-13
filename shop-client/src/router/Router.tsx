import { createBrowserRouter } from 'react-router-dom';

// views
import HomeView from '../views/Home';

const router = createBrowserRouter([
    { path: '/', element: <HomeView /> },
    { path: '/list', element: <HomeView /> },
]);

export default router;
