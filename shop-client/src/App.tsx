import { RouterProvider } from 'react-router-dom';
import router from './router/Router';

import './assets/styles/styles.scss';
import 'primeicons/primeicons.css';

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
