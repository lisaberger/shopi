import styles from './Subnavbar.component.module.scss';

const Subnavbar = () => {
    return (
        <div className={`${styles.subnavbar} text-sm font-medium flex gap-2 bg-bluegray-900 px-2 md:px-8 py-2`}>
            <div className='flex text-white align-items-baseline'>
                <p>Kleidung</p>
                <i className='pi pi-angle-down ml-1' />
            </div>
            <div className={`${styles.icon} flex text-white align-items-baseline`}>
                <p>Möbel</p>
                <i className='pi pi-angle-down ml-1' />
            </div>
        </div>
    );
};

export default Subnavbar;
