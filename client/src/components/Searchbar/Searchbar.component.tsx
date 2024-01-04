import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSearchInput } from '@/store/slices/filterSlice';

import styles from './Searchbar.component.module.scss';
import { useNavigate } from 'react-router-dom';

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => dispatch(setSearchInput(searchValue)), 1000);
        return () => clearTimeout(delay);
    }, [dispatch, searchValue]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        dispatch(setSearchInput(searchValue));
        navigate('/');
    };

    return (
        <span className={`${styles.searchbar} px-4 lg:max-w-30rem p-inputgroup p-inputtext-sm`}>
            <InputText value={searchValue} onChange={handleInputChange} placeholder='Produkt suchen' />
            <Button onClick={handleSearch} icon='pi pi-search' className='p-button-warning' />
        </span>
    );
};

export default Searchbar;
