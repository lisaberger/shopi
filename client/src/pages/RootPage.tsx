import Header from '@/containers/Header/Header.container';
import Footer from '@/containers/Footer/Footer.container';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Banner from '@/components/Banner/Banner.component';
import { useAppSelector } from '@/store/hooks';

const RootPage = () => {
    const [banner, setBanner] = useState(true);
    const [onHomePage, setOnHomePage] = useState(false);
    const [mainMarginTop, setMainMarginTop] = useState('');

    const { searchInput } = useAppSelector((state) => state.filter);

    const closeBannerHandler = () => {
        setBanner(false);
    };

    const headerMarginTop = banner ? 'var(--bannerHeight)' : '0px';

    /**
     * different margin tops for main content
     */
    const changeMainMarginTop = (searchInput: string, onHomePage: boolean, banner: boolean) => {
        let marginTopValue = '0px';

        if (onHomePage) {
            marginTopValue =
                searchInput.length > 0
                    ? banner
                        ? `calc(var(--bannerHeight) + var(--navbarHeight) + var(--subnavbarHeight))`
                        : `calc(var(--navbarHeight) + var(--subnavbarHeight))`
                    : '0px';
        } else {
            marginTopValue = banner
                ? `calc(var(--bannerHeight) + var(--navbarHeight) + var(--subnavbarHeight))`
                : `calc(var(--navbarHeight) + var(--subnavbarHeight))`;
        }

        setMainMarginTop(marginTopValue);
    };

    useEffect(() => {
        changeMainMarginTop(searchInput, onHomePage, banner);
    }, [banner, onHomePage, searchInput]);

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

        if (searchInput.length > 0) {
            setOnHomePage(false);
        }
    }, [location.pathname, searchInput.length]);

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
