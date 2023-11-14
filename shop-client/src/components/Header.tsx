import { Menubar } from 'primereact/menubar';
import logo from '../assets/logo-wortbild-marke.svg';

const Header = () => {
    const navbarMenuItems = [{ label: 'Find Products', icon: 'pi pi-google' }];

    const shopLogo = <img alt='logo' src={logo} height='40' className='mr-5' />;
    // const searchInput = <InputText placeholder='Search' type='text' />;

    return (
        <header>
            <Menubar start={shopLogo} model={navbarMenuItems} />
        </header>
    );
};

export default Header;
