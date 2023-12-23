import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import ProductCard from '../ProductCard/ProductCard';
import { useAppSelector } from '@/store/hooks';
import { DataView } from 'primereact/dataview';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { useEffect, useState } from 'react';

const ProductList = () => {
    const [search, setSearch] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const categories = [
        { name: 'Elektronik', key: 'E', value: 'electronics' },
        { name: 'Kleidung', key: 'K', value: 'clothing' },
        { name: 'Möbel', key: 'M', value: 'furniture' },
    ];

    interface Category {
        name: string;
        key: string;
        value: string;
    }

    const { searchInput } = useAppSelector((state) => state.filter);

    useEffect(() => {
        setSearch(searchInput);
    }, [searchInput]);

    const {
        data: products,
        isLoading,
        error,
    } = useGetProductsQuery({ search, categories: [...selectedCategories.map((category) => category.value)] });

    const onCategoryChange = (event: CheckboxChangeEvent) => {
        let _selectedCategories = [...selectedCategories];

        if (event.checked) {
            _selectedCategories.push(event.value);
        } else {
            _selectedCategories = _selectedCategories.filter((category) => category.key !== event.value.key);
        }

        setSelectedCategories(_selectedCategories);
    };

    const productCard = (product) => <ProductCard product={product} />;

    return (
        <section>
            <h1 className='px-4 md:px-8 text-2xl pb-4 text-color'>Neu im Sortiment</h1>
            <div className='grid gap-3 pb-2 px-4 md:px-8 md:gap-5 text-color'>
                <aside className='col-12 md:col-2'>
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
                <div className='col-12 md:col'>
                    <h2 className='text-xl font-medium'>Produkte</h2>
                    {isLoading && <p>Produkte werden geladen ...</p>}
                    {error && <p>Produkte konnten nicht geladen werden.</p>}
                    <DataView value={products} itemTemplate={productCard} />
                </div>
            </div>
        </section>
    );
};

export default ProductList;
