import { Menubar } from 'primereact/menubar';

const Header = () => {
    const items = [{ label: 'File', icon: 'pi pi-fw pi-trash' }];
    return (
        <header className='p-2'>
            <Menubar model={items} />
        </header>
    );
};

export default Header;
