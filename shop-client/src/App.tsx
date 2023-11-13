import { RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import router from './router/router';

import './assets/styles/index.scss';

import 'primereact/resources/themes/md-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {
    return (
        <>
            <Header />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
