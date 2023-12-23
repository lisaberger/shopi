import { Badge } from 'primereact/badge';
import { logout } from '@/store/slices/authSlice';
import { useLogoutMutation } from '@/store/slices/usersApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Searchbar from '@/components/Searchbar/Searchbar';
import logo from '@/assets/logo/logo-bild-marke.svg';
import styles from './Header.module.scss';
import { useState } from 'react';
import { Button } from 'primereact/button';
import Banner from '@/components/Banner';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex align-items-center'>
                <img alt='logo' src={logo} className={styles.logo} />
                <p className='pl-1 text-xl font-semibold hidden md:block'>shopi</p>
            </div>
        </Link>
    );
};

const Header = () => {
    const [banner, setBanner] = useState(true);

    const closeBannerHandler = () => {
        setBanner(false);
    };

    const { userInfo } = useAppSelector((state) => state.auth);

    const [logoutApi] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApi().unwrap();

            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const toggleHeaderHandler = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const closeHeaderOnNavigationHandler = () => {
        setIsNavExpanded(false);
    };

    const expanded = isNavExpanded ? styles.expanded : '';

    const menuButton = !isNavExpanded ? (
        <Button icon='pi pi-bars' severity='secondary' text className='md:hidden cursor-pointer' onClick={toggleHeaderHandler} />
    ) : (
        <Button icon='pi pi-times' severity='secondary' text className='md:hidden cursor-pointer' onClick={toggleHeaderHandler} />
    );

    return (
        <header>
            {banner && <Banner onCloseBanner={closeBannerHandler} />}
            <div className={`${styles.header} px-4 md:px-8 py-2 p-menubar relative`}>
                <nav className='flex justify-content-between w-full align-items-center'>
                    <Logo />
                    <Searchbar />
                    {menuButton}
                    <div className={`${styles.menu} ${expanded}`}>
                        <ul className={styles.list}>
                            <li>
                                <Link to='/' onClick={closeHeaderOnNavigationHandler} className={styles.item}>
                                    <i className={`${styles.icon} pi pi-shopping-cart p-overlay-badge`}>
                                        <Badge value='1' />
                                    </i>
                                    <p>Warenkorb</p>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' onClick={closeHeaderOnNavigationHandler} className={styles.item}>
                                    <i className={`${styles.icon} pi pi-heart`} />
                                    <p>Merkliste</p>
                                </Link>
                            </li>
                            {userInfo ? (
                                <>
                                    <li>
                                        <Link to='/profile' className={styles.item}>
                                            <i className={`${styles.icon} pi pi-user`} />
                                            <p>{userInfo.name}</p>
                                        </Link>
                                    </li>
                                    <Button severity='secondary' onClick={logoutHandler}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <li>
                                    <Link to='/login' onClick={closeHeaderOnNavigationHandler} className={styles.item}>
                                        <i className={`${styles.icon} pi pi-user`} />
                                        <p>Login</p>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
