import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import ProductCard from '../../components/ProductCard/ProductCard.component';
import { useAppSelector } from '@/store/hooks';
import { DataView } from 'primereact/dataview';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@/store/slices/categoriesApiSlice';
import { ICategory } from '@/utils/types/category.interface';
import { IProduct } from '@/utils/types/product.interface';
import { Divider } from 'primereact/divider';

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

    const productCard = (product: IProduct) => <ProductCard product={product} />;

    return (
        <section style={{ maxWidth: '1500px', margin: '0 auto' }}>
            <h1 className='px-4 md:px-8 text-xl font-bold text-color'>Neu im Sortiment</h1>
            <div className='grid gap-3 pb-2 px-4 md:px-8 md:gap-5 text-color'>
                <Divider />
                <div className='col-12 md:col-2'>
                    <h2 className='text-lg font-medium'>Filter</h2>
                    <h3 className='text-sm mt-2 font-medium'>Kategorie</h3>
                    <div className='py-2 flex gap-3 md:flex-column md:gap-2'>
                        {categories?.map((category: ICategory) => {
                            return (
                                <div key={category._id} className='flex align-items-center'>
                                    <Checkbox
                                        inputId={category._id}
                                        name='category'
                                        value={category._id}
                                        onChange={onCategoryChange}
                                        checked={selectedCategories.includes(category._id)}
                                    />
                                    <label htmlFor={category._id} className='ml-2 text-sm'>
                                        {category.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <Divider />
                    <h3 className='text-sm mt-4 font-medium'>Marke</h3>
                    <div className='p-2 flex gap-3 md:flex-column md:gap-2'>
                        <div className='flex align-items-center'></div>
                    </div>
                    <Divider />
                    <h3 className='text-sm mt-4 font-medium'>Preis</h3>
                </div>
                <div className='col-12 md:col'>
                    <h2 className='text-lg font-medium inline'>Produkte</h2>
                    <span className=' ml-1 text-xs'>({products?.length})</span>
                    {isLoading && <p>Produkte werden geladen ...</p>}
                    {error && <p>Produkte konnten nicht geladen werden.</p>}
                    <DataView value={products} itemTemplate={productCard} paginator rows={5} />
                </div>
            </div>
        </section>
    );
};

export default ProductList;
