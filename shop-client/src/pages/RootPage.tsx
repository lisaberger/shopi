import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Banner from '@/components/Banner/Banner';
import { useState } from 'react';

const RootPage = () => {
    const [banner, setBanner] = useState(true);

    const closeBannerHandler = () => {
        setBanner(false);
    };

    return (
        <>
            {banner && <Banner onCloseBanner={closeBannerHandler} />}
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootPage;
