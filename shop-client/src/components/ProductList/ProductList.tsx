import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import { Product } from '@/utils/types/product.interface';
import { Dropdown } from 'primereact/dropdown';
import ProductCard from '../ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const ProductList = () => {
    const [URLSearchParams, setURLSearchParams] = useSearchParams();
    const [category, setCategory] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    const categoryOptions = ['Electronics', 'Shoes'];

    const { searchInput } = useAppSelector((state) => state.filter);

    console.log(URLSearchParams);

    useEffect(() => {
        setSearch(searchInput);

        setURLSearchParams({
            search,
            category,
        });
    }, [category, search, searchInput, setURLSearchParams]);

    const { data: products, isLoading, error } = useGetProductsQuery({ search, category });

    const productTemplate = (product) => <ProductCard product={product} />;

    return (
        <section>
            <div className='grid gap-5'>
                <div className='col-2'>
                    <h2>Filter</h2>
                    <div className='p-2'>
                        <Dropdown
                            id='category'
                            options={categoryOptions}
                            value={category}
                            onChange={(e) => setCategory(e.value)}
                            placeholder='Wähle eine Kategorie'
                        />
                    </div>
                </div>
                <div className='col'>
                    <h2>Produkte</h2>
                    <DataView value={products} itemTemplate={productTemplate} />
                </div>
            </div>
        </section>
    );
};

export default ProductList;
