import Header from '@/containers/Header/HeaderContainer';
import Footer from '@/containers/Footer/FooterContainer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const RootPage = () => {
    return (
        <div className='h-full flex flex-column justify-content-between'>
            <Header />
            <main className='flex-grow-1'>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default RootPage;
