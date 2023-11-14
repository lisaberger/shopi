import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

const Header = () => {
    const navbarMenuItems = [{ label: 'Find Products' }];

    const shopLogo = <img alt='logo' src='../assets/react.svg' height='40' className='mr-3' />;
    const searchInput = <InputText placeholder='Search' type='text' />;

    return (
        <header>
            <Menubar start={shopLogo} end={searchInput} model={navbarMenuItems} />
        </header>
    );
};

export default Header;
