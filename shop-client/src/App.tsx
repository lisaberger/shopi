import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import './assets/styles/styles.scss';

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />;
        </Provider>
    );
};

export default App;
