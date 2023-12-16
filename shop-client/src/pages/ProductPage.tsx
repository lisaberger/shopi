import { Button } from 'primereact/button';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { useGetProductByIdQuery } from '@/store/slices/productsApiSlice';
import ProductViewer from '@/components/ProductViewer/ProductViewer';

const ProductPage = () => {
    const { id: productId } = useParams();

    const { data: product, isLoading, error } = useGetProductByIdQuery(productId ? productId : '');

    const [qty, setQty] = useState(1);

    return (
        <>
            <section className='px-4 md:px-8 py-4'>
                <Link to='/'>
                    <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
                </Link>
                {product && (
                    <section className='grid mt-2 text-color'>
                        <div className='col-12 md:col-6 h-full'>
                            <ProductViewer product={product.model} />
                        </div>
                        <div className='col-12 md:col-6'>
                            <div className='flex align-items-center text-primary pb-1'>
                                <i className='font-semibold pi pi-tag pr-2' />
                                <p className='font-semibold'>{product.category}</p>
                            </div>
                            <h1 className='font-bold text-3xl pb-2'>{product.name}</h1>
                            {product.countInStock ? (
                                <span className='text-green-300 text-sm'>
                                    <i className='pi pi-check pr-2 text-sm' />
                                    Verfügbar
                                </span>
                            ) : (
                                <span className='text-red-300 text-sm'>Aktuell nicht verfügbar</span>
                            )}
                            <p className='text-lg font-semibold pt-4 pb-2'>Preis: € {product.price}</p>

                            <p>{product.description}</p>
                            <div className='pt-4'>
                                {product.countInStock > 0 && (
                                    <Dropdown
                                        value={qty}
                                        onChange={(e) => setQty(e.value)}
                                        options={[...Array(product.countInStock).keys()].map((x) => x + 1)}
                                        placeholder='Menge'
                                    />
                                )}
                                <Button className='text-color ml-2' label='Zum Warenkorb hinzufügen' />
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};

export default ProductPage;
