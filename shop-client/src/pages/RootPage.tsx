import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
    return (
        <div className='h-full flex flex-column justify-content-between'>
            <Header />
            <main className='h-full'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootPage;
