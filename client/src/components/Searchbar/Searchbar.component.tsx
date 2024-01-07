import { Button } from 'primereact/button';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSearchInput } from '@/store/slices/filterSlice';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteSelectEvent } from 'primereact/autocomplete';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import styles from './Searchbar.component.module.scss';
import { IProduct } from '@/utils/types/product.interface';

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data: products } = useGetProductsQuery({});
    const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /**
     * autmatic search by typing (with delay)
     */
    useEffect(() => {
        const delay = setTimeout(() => dispatch(setSearchInput(searchValue)), 1000);
        return () => clearTimeout(delay);
    }, [dispatch, searchValue]);

    const handleInputChange = (event: AutoCompleteChangeEvent) => {
        setSearchValue(event.target.value);
    };

    /**
     * search via search Button
     */
    const handleSearch = () => {
        dispatch(setSearchInput(searchValue));
        navigate('/');
    };

    /**
     * search by suggested product
     */
    const handleSelect = (event: AutoCompleteSelectEvent) => {
        setSearchValue(event.value.name);
    };

    const searchSuggestions = (event) => {
        let _filteredProducts;

        if (!event.query.trim().length) {
            _filteredProducts = [...products];
        } else {
            _filteredProducts = products.filter((country) => {
                return country.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredProducts(_filteredProducts);
    };

    const searchItem = (item: IProduct) => {
        return (
            <div className='flex align-items-center'>
                <img alt={item.name} src={item.poster} style={{ width: '24px' }} className='mr-2' />
                <p>{item.name}</p>
            </div>
        );
    };

    return (
        <span className={`${styles.searchbar} px-4 lg:max-w-30rem p-inputgroup p-inputtext-sm`}>
            <AutoComplete
                value={searchValue}
                field='name'
                suggestions={filteredProducts}
                onSelect={handleSelect}
                completeMethod={searchSuggestions}
                onChange={handleInputChange}
                placeholder='Produkt suchen'
                itemTemplate={searchItem}
            />
            <Button onClick={handleSearch} icon='pi pi-search' className='p-button-warning' />
        </span>
    );
};

export default Searchbar;
