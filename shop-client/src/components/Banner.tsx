const Banner = () => {
    return (
        <div className='bg-bluegray-900 text-xs text-gray-100 py-1 flex justify-content-between lg:justify-content-center align-items-center flex-wrap'>
            <div className='font-semibold mr-8'>🔥 Black Friday!</div>
            <div className='align-items-center hidden lg:flex'>
                <span className='line-height-3'>Sichere dir die neusten Angebote.</span>
            </div>
            <a className='flex align-items-center ml-2 mr-8'>
                <span className='underline font-bold'>Mehr dazu</span>
            </a>
            <a
                className='flex align-items-center no-underline justify-content-center border-circle text-100 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150'
                style={{ width: '2rem', height: '2rem' }}
            >
                <i className='pi pi-times'></i>
            </a>
        </div>
    );
};

export default Banner;
