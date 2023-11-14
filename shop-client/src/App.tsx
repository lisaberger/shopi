import Header from './components/Header';
import Footer from './components/Footer';

import './assets/styles/theme.scss';
import './assets/styles/index.scss';

import 'primereact/resources/themes/md-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {
    return (
        <>
            <Header />
            <main className='py-3'></main>
            <Footer />
        </>
    );
}

export default App;
