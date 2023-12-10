import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import styles from './Searchbar.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSearchInput } from '@/store/slices/filterSlice';

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useAppDispatch();

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const searchHandler = () => {
        dispatch(setSearchInput(searchValue));
    };
    return (
        <span className={`${styles.searchbar} max-w-30rem p-inputgroup p-inputtext-sm`}>
            <InputText value={searchValue} onChange={handleInputChange} placeholder='Produkt suchen' />
            <Button onClick={searchHandler} icon='pi pi-search' className='p-button-warning' />
        </span>
    );
};

export default Searchbar;
