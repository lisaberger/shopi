import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import ProductCard from '../ProductCard/ProductCard';
import { useAppSelector } from '@/store/hooks';
import { DataView } from 'primereact/dataview';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@/store/slices/categoriesApiSlice';
import { Category } from '@/utils/types/category.interface';
import { Product } from '@/utils/types/product.interface';

const ProductList = () => {
    const [search, setSearch] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const { data: categories } = useGetCategoriesQuery({});
    const { searchInput } = useAppSelector((state) => state.filter);

    useEffect(() => {
        setSearch(searchInput);
    }, [searchInput]);

    const { data: products, isLoading, error } = useGetProductsQuery({ search, categories: selectedCategories });

    const onCategoryChange = (event: CheckboxChangeEvent) => {
        const categoryId = event.value;

        const updatedCategories = event.checked
            ? [...selectedCategories, categoryId]
            : selectedCategories.filter((category) => category !== categoryId);

        setSelectedCategories(updatedCategories);
    };

    const productCard = (product: Product) => <ProductCard product={product} />;

    return (
        <section>
            <h1 className='px-4 md:px-8 text-2xl pb-4 text-color'>Neu im Sortiment</h1>
            <div className='grid gap-3 pb-2 px-4 md:px-8 md:gap-5 text-color'>
                <aside className='col-12 md:col-2'>
                    <h2 className='text-xl font-medium'>Filter</h2>
                    <div className='p-2 flex gap-3 md:flex-column md:gap-2'>
                        {categories?.map((category: Category) => {
                            return (
                                <div key={category._id} className='flex align-items-center'>
                                    <Checkbox
                                        inputId={category._id}
                                        name='category'
                                        value={category._id}
                                        onChange={onCategoryChange}
                                        checked={selectedCategories.includes(category._id)}
                                    />
                                    <label htmlFor={category._id} className='ml-2'>
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
