import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import Banner from '@/components/Banner';
import { useState } from 'react';

const RootPage = () => {
    const [banner, setBanner] = useState(true);

    const closeBannerHandler = (event) => {
        setBanner(event);
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
