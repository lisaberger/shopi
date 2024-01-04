import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar.component';
import { UserInfo } from '@/utils/types/user.inferface';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { FC, useEffect, useState } from 'react';
import Logo from '@/components/Logo/Logo.component';

import styles from './Navbar.component.module.scss';

interface NavbarProps {
    variant: 'transparent' | 'white';
    cartItemsCount: number;
    userInfo: UserInfo;
    onLogout: () => void;
}

const Navbar: FC<NavbarProps> = ({ cartItemsCount, userInfo, onLogout, variant }) => {
    const [activeScroll, setActiveScroll] = useState(false);
    const [isNavbarExpanded, setIsNavExpanded] = useState(false);
    const [navbarTheme, setNavbarTheme] = useState('');

    /**
     * Responsive menu
     */
    const toggleHeaderHandler = () => {
        setIsNavExpanded(!isNavbarExpanded);
    };

    const closeHeaderOnNavigationHandler = () => {
        setIsNavExpanded(false);
    };

    const expanded = isNavbarExpanded ? styles.expanded : '';

    const menuButtonIcon = !isNavbarExpanded ? 'pi pi-bars' : 'pi pi-times';

    const logoutHandler = () => {
        onLogout();
    };

    /**
     * Navbar scroll- and location-based styling change
     */
    useEffect(() => {
        if (typeof window !== 'undefined' && variant === 'transparent') {
            window.addEventListener('scroll', () => setActiveScroll(window.scrollY > 10));
        }

        changeNavbarTheme(variant);
    }, [variant]);

    const changeNavbarTheme = (variant: 'white' | 'transparent') => {
        if (variant === 'transparent') {
            setNavbarTheme('text-white');
        } else {
            setNavbarTheme('bg-white text-color');
        }
    };

    return (
        <div
            className={`${styles.navbar} ${navbarTheme} ${
                activeScroll ? 'bg-white transition-duration-500 text-color' : ''
            } px-4 md:px-8 py-2 relative flex align-items-center`}
        >
            <nav className='flex justify-content-between w-full align-items-center'>
                <Logo />
                <Searchbar />
                <Button
                    icon={menuButtonIcon}
                    severity='secondary'
                    text
                    className={`${activeScroll ? 'bg-white text-color' : ''} md:hidden cursor-pointer text-white`}
                    onClick={toggleHeaderHandler}
                />
                <div className={`${styles.menu} ${expanded}`}>
                    <ul className={styles.list}>
                        <li>
                            <Link to='/cart' onClick={closeHeaderOnNavigationHandler} className={styles.item}>
                                <i className={`${styles.icon} pi pi-shopping-cart p-overlay-badge`}>
                                    {cartItemsCount > 0 && <Badge value={cartItemsCount} />}
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
    );
};

export default Navbar;
