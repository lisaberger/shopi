import React from 'react';

interface Banner {
    onCloseBanner: () => void;
}

const Banner: React.FC<Banner> = (props) => {
    const onCloseHandler = () => {
        props.onCloseBanner();
    };

    return (
        <div className='bg-primary-500'>
            <div className='flex text-sm text-color py-2 px-4 md:px-8 flex flex-row justify-content-between align-items-center'>
                <div></div>
                <div className='flex'>
                    <p className='font-semibold'>🔥 Black Friday!</p>
                    <p className='pl-2 pr-8 align-items-center hidden md:block'>Jetzt tolle Angebote sichern.</p>
                </div>
                <i className='pl-2 pi pi-times cursor-pointer' onClick={onCloseHandler} />
            </div>
        </div>
    );
};

export default Banner;
