import logo from '@/assets/logo/logo-wortbild-marke.svg';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { logout } from '@/store/slices/authSlice';
import { useLogoutMutation } from '@/store/slices/usersApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Searchbar from '@/components/Searchbar/Searchbar';

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();

            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <header className='px-8 py-2 p-menubar flex flex-nowrap justify-content-between'>
            <Link to='/'>
                <img alt='logo' src={logo} style={{ height: '2rem' }} className='mr-3' />
            </Link>
            <Searchbar />
            <span className='flex align-items-center flex-nowrap'>
                <span className='flex flex-nowrap gap-3 align-items-center'>
                    <Link to='/'>
                        <span className='flex flex-column justify-content-center align-items-center'>
                            <i className='pi pi-shopping-cart p-overlay-badge' style={{ fontSize: '1rem' }}>
                                <Badge value='1' />
                            </i>
                            <p className='text-xs'>Warenkorb</p>
                        </span>
                    </Link>
                    <Link to='/'>
                        <span className='flex flex-column justify-content-center align-items-center'>
                            <i className='pi pi-heart' style={{ fontSize: '1rem' }}></i>
                            <p className='text-xs'>Merkliste</p>
                        </span>
                    </Link>
                    {userInfo ? (
                        <>
                            <Link to='/profile'>
                                <p>{userInfo.name}</p>
                            </Link>
                            <p onClick={logoutHandler}>Logout</p>
                        </>
                    ) : (
                        // <Avatar image='/images/avatar/onyamalimba.png' shape='circle' />
                        <Link to='/login'>
                            <span className='flex flex-column justify-content-center align-items-center'>
                                <i className='pi pi-user' style={{ fontSize: '1rem' }}></i>
                                <p className='text-xs'>Login</p>
                            </span>
                        </Link>
                    )}
                </span>
            </span>
        </header>
    );
};

export default Header;
