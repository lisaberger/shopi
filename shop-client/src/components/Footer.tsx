const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className='grid'>
                <div className='col'>
                    <p>WebShop &copy; {currentYear}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
