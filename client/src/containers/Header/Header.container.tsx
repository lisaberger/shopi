import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';
import { useLogoutMutation } from '@/store/slices/usersApiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Navbar from '@/components/Navbar/Navbar.component';
import Subnavbar from '@/components/Subnavbar/Subnavbar.component';

interface HeaderProps {
    navbarVariant: 'transparent' | 'white';
}

const Header: FC<HeaderProps> = ({ navbarVariant }) => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { userInfo } = useAppSelector((state) => state.auth);

    const [logoutApi] = useLogoutMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logoutApi({}).unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    const [activeScroll, setActiveScroll] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => setActiveScroll(window.scrollY > 10));
        }
    }, []);

    return (
        <>
            <Navbar variant={navbarVariant} userInfo={userInfo} cartItemsCount={cartItems.length} onLogout={logoutHandler} />
            {activeScroll && <Subnavbar />}
        </>
    );
};

export default Header;
