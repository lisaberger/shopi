import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='flex justify-content-center px-8 py-3'>
            <p className='text-xs'>shopi &copy; {currentYear}</p>
        </div>
    );
};

export default Footer;
