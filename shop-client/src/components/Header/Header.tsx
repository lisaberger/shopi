import { Menubar } from 'primereact/menubar';
import logo from '../../assets/logo-wortbild-marke.svg';
import { InputText } from 'primereact/inputtext';
import styles from './Header.module.scss';

const Header = () => {
    const navbarMenuItems = [{ label: 'Products', icon: 'pi pi-google' }];

    const shopLogo = <img alt='logo' src={logo} height='40' className='mr-3' />;
    const searchInput = <InputText placeholder='Search' type='text' />;

    return (
        <header className={styles.header}>
            <Menubar start={shopLogo} end={searchInput} model={navbarMenuItems} className='px-7' />
        </header>
    );
};

export default Header;
