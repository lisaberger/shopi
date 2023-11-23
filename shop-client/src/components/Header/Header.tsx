import logo from '../../assets/logo-wortbild-marke.svg';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='px-8 p-menubar flex flex-nowrap justify-content-between'>
            <Link to={'/'}>
                <img alt='logo' src={logo} height='40' className='mr-3' />
            </Link>
            <span className='p-inputgroup' style={{ maxWidth: '500px' }}>
                <InputText placeholder='Produkt suchen' />
                <Button icon='pi pi-search' className='p-button-warning' />
            </span>
            <span className='flex align-items-center flex-nowrap'>
                <span className='flex flex-nowrap gap-3 align-items-center'>
                    <Link to='/'>
                        <span className='flex flex-column justify-content-center align-items-center'>
                            <i className='pi pi-shopping-cart p-overlay-badge' style={{ fontSize: '1.2rem' }}>
                                <Badge value='1' />
                            </i>
                            <p className='text-xs'>Warenkorb</p>
                        </span>
                    </Link>
                    <Link to='/'>
                        <span className='flex flex-column justify-content-center align-items-center'>
                            <i className='pi pi-heart' style={{ fontSize: '1.2rem' }}></i>
                            <p className='text-xs'>Merkliste</p>
                        </span>
                    </Link>
                    <span className='ml-2 flex justify-content-center align-items-center'>
                        <Avatar image='/images/avatar/onyamalimba.png' shape='circle' />
                        <p className='ml-2'>Sign in</p>
                    </span>
                </span>
            </span>
        </header>
    );
};

export default Header;
