import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './views/Home';

const router = createBrowserRouter([{ path: '/', element: <HomePage /> }]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
