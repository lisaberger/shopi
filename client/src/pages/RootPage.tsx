import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
    return (
        <div className='h-full flex flex-column justify-content-between'>
            <Header className='flex-none' />
            <main className='flex-grow-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootPage;
