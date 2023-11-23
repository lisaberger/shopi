import { createBrowserRouter } from 'react-router-dom';

// views
import HomeView from '../pages/HomePage';
import RootPage from '../pages/RootPage';

const router = createBrowserRouter([{ path: '/', element: <RootPage />, children: [{ path: '', element: <HomeView /> }] }]);

export default router;
