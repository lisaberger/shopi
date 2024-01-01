const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='flex-none px-8 py-3'>
            <div className='flex justify-content-center'>
                <p className='text-xs'>shopi &copy; {currentYear}</p>
            </div>
        </footer>
    );
};

export default Footer;
