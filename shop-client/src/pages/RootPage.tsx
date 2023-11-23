import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
    return (
        <>
            <Header />
            <main className='py-4'>
                <Outlet />
            </main>
            <Footer />;
        </>
    );
};

export default RootPage;
