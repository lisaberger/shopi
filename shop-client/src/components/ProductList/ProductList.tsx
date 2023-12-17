import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import ProductCard from '../ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DataView } from 'primereact/dataview';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';

const ProductList = () => {
    const [URLSearchParams, setURLSearchParams] = useSearchParams();
    const [category, setCategory] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const categories = [
        { name: 'Elektronik', key: 'E' },
        { name: 'Kleidung', key: 'K' },
        { name: 'Möbel', key: 'M' },
    ];

    interface Category {
        name: string;
        key: string;
    }

    const { searchInput } = useAppSelector((state) => state.filter);

    useEffect(() => {
        setSearch(searchInput);

        setURLSearchParams({
            search,
            category: [...selectedCategories.map((category) => category.name)],
        });
    }, [search, searchInput, selectedCategories, setURLSearchParams]);

    const { data: products, isLoading, error } = useGetProductsQuery({ search, ...selectedCategories });

    const onCategoryChange = (e: CheckboxChangeEvent) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) _selectedCategories.push(e.value);
        else _selectedCategories = _selectedCategories.filter((category) => category.key !== e.value.key);

        setSelectedCategories(_selectedCategories);
    };

    const productTemplate = (product) => <ProductCard product={product} />;

    return (
        <section>
            <h1 className='px-4 md:px-8 text-2xl pb-4 text-color'>Neu im Sortiment</h1>
            <div className='grid gap-3 pb-2 px-4 md:px-8 md:gap-5 text-color'>
                <aside className='col-2'>
                    <h2 className='text-xl font-medium'>Filter</h2>
                    <div className='p-2 flex gap-3 md:flex-column md:gap-2'>
                        {categories.map((category) => {
                            return (
                                <div key={category.key} className='flex align-items-center'>
                                    <Checkbox
                                        inputId={category.key}
                                        name='category'
                                        value={category}
                                        onChange={onCategoryChange}
                                        checked={selectedCategories.some((item) => item.key === category.key)}
                                    />
                                    <label htmlFor={category.key} className='ml-2'>
                                        {category.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </aside>
                <div className='col'>
                    <h2 className='text-xl font-medium'>Produkte</h2>
                    <DataView value={products} itemTemplate={productTemplate} />
                </div>
            </div>
        </section>
    );
};

export default ProductList;
