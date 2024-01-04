import styles from './Subnavbar.component.module.scss';

const Subnavbar = () => {
    return (
        <div className={`${styles.subnavbar} text-sm font-medium flex gap-2 bg-bluegray-900 px-4 md:px-8 py-2 align-items-center`}>
            <div className='flex text-white align-items-baseline cursor-pointer'>
                <p>Kleidung</p>
                <i className={`${styles.icon} pi pi-angle-down ml-1`} />
            </div>
            <div className='ml-2 text-sm flex text-white align-items-baseline cursor-pointer'>
                <p>Einrichtung</p>
                <i className={`${styles.icon} pi pi-angle-down ml-1`} />
            </div>
            <div className='ml-2 text-sm flex text-white align-items-baseline cursor-pointer'>
                <p>Elektronik</p>
                <i className={`${styles.icon} pi pi-angle-down ml-1`} />
            </div>
        </div>
    );
};

export default Subnavbar;
