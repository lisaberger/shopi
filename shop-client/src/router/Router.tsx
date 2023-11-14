import { createBrowserRouter } from 'react-router-dom';

// views
import App from '../App';
import HomeView from '../views/Home';

const router = createBrowserRouter([{ path: '/', element: <App />, children: [{ path: '/home', element: <HomeView /> }] }]);

export default router;
