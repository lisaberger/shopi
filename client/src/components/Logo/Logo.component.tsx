import { Link } from 'react-router-dom';
import logoSvg from '@/assets/logo/logo-bild-marke.svg';
import styles from './Logo.component.module.scss';
import { FC } from 'react';

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
    return (
        <Link to='/'>
            <div className='flex align-items-center'>
                <img alt='logo' src={logoSvg} className={styles.logo} />
                <p className='pl-1 text-xl font-semibold hidden md:block'>shopi</p>
            </div>
        </Link>
    );
};

export default Logo;
