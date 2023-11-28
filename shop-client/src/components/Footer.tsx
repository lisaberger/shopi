const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='px-8'>
            <div>
                <div>
                    <p>eShop &copy; {currentYear}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
