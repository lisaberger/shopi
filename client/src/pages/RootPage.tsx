import Header from '@/containers/Header/Header.container';
import Footer from '@/containers/Footer/Footer.container';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Banner from '@/components/Banner/Banner.component';

const RootPage = () => {
    const [banner, setBanner] = useState(true);
    const [onHomePage, setOnHomePage] = useState(false);
    const [mainMarginTop, setMainMarginTop] = useState('');

    const closeBannerHandler = () => {
        setBanner(false);
    };

    const headerMarginTop = banner ? '34.4px' : '0px';

    /**
     * different margin tops for main content
     */
    const changeMainMarginTop = (onHomePage: boolean, banner: boolean) => {
        if (onHomePage) {
            setMainMarginTop('0px');
            return;
        }

        if (banner) {
            setMainMarginTop('104.4px');
            return;
        }

        setMainMarginTop('70px');
    };

    useEffect(() => {
        changeMainMarginTop(onHomePage, banner);
    }, [banner, onHomePage]);

    /**
     * change header variant based on location
     */
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setOnHomePage(true);
        } else {
            setOnHomePage(false);
        }
    }, [location.pathname]);

    return (
        <div className='h-full flex flex-column justify-content-between'>
            {banner && <Banner onCloseBanner={closeBannerHandler} />}
            <header className='flex-none w-full fixed z-4' style={{ marginTop: headerMarginTop }}>
                <Header navbarVariant={onHomePage ? 'transparent' : 'white'} />
            </header>
            <main className='flex-grow-1 surface-100' style={{ marginTop: mainMarginTop }}>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
            <footer className='flex-none'>
                <Footer />
            </footer>
        </div>
    );
};

export default RootPage;
