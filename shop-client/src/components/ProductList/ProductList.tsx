import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import { Product } from '@/utils/types/product.interface';
import { Dropdown } from 'primereact/dropdown';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductList() {
    const [URLSearchParams, setURLSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const categoryOptions = ['Electronics', 'Shoes'];

    useEffect(() => {
        setURLSearchParams({
            search: searchInput,
            category: category,
        });
    }, [category, searchInput, setURLSearchParams]);

    const { data: products, isLoading, error } = useGetProductsQuery(URLSearchParams);

    return (
        <section className={styles.productList}>
            <div className='grid'>
                <div className='col-3'>
                    <div>
                        <h2>Filter</h2>
                        <Dropdown
                            id='category'
                            options={categoryOptions}
                            value={category}
                            onChange={(e) => setCategory(e.value)}
                            placeholder='Wähle eine Kategorie'
                        />
                    </div>
                </div>
                <div className='col-7'>
                    <h2>Produkte</h2>
                    <div className='flex gap-3'>
                        {isLoading && <p>Die Produkte werden geladen ...</p>}
                        {products &&
                            products.map((product: Product) => {
                                return <ProductCard key={product._id} product={product} />;
                            })}
                    </div>
                </div>
            </div>
        </section>
    );
}
