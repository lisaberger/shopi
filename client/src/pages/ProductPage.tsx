import { Button } from 'primereact/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { useState } from 'react';
import { useGetProductByIdQuery } from '@/store/slices/productsApiSlice';
import ProductARViewer from '@/containers/ProductARViewer/ProductARViewer.container';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

const ProductPage = () => {
    const { id: productId } = useParams();

    const { data: product, isLoading, error } = useGetProductByIdQuery(productId ? productId : '');

    const [qty, setQty] = useState(1);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <>
            <section className='p-4 md:px-8' style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Link to='/'>
                    <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
                </Link>
                {product && (
                    <section className='grid mt-2 text-color'>
                        {error && <p>Fehler beim Laden des Produkts</p>}
                        {isLoading && <p>Produktinformationen werden geladen ...</p>}
                        <div className='col-12 md:col-6 h-full'>
                            <ProductARViewer model={product.model} name={product.name} preview={product.preview} annotations={product.annotations} />
                        </div>
                        <div className='col-12 md:col-6 md:pl-5'>
                            <div className='flex align-items-center pb-1'>
                                <i className='pi pi-tag pr-2' />
                                <p className='font-medium'>{product.category.name}</p>
                            </div>
                            <h1 className='font-bold text-2xl pb-2'>{product.name}</h1>
                            <Rating value={product.rating} readOnly cancel={false} />
                            {product.countInStock ? (
                                <div className='text-xs mt-2'>
                                    <i className='pi pi-check pr-2 text-sm' />
                                    Verfügbar
                                </div>
                            ) : (
                                <span className='text-sm'>Aktuell nicht verfügbar</span>
                            )}
                            <p className='text-lg font-medium pt-4 pb-2'>Preis: € {product.price}</p>

                            <p className='text-base'>{product.description}</p>
                            <div className='pt-4'>
                                {product.countInStock > 0 && (
                                    <Dropdown
                                        value={qty}
                                        onChange={(e) => setQty(e.value)}
                                        options={[...Array(product.countInStock).keys()].map((x) => x + 1)}
                                        placeholder='Menge'
                                    />
                                )}
                                <Button onClick={addToCartHandler} className='text-color ml-2' label='Zum Warenkorb hinzufügen' />
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};

export default ProductPage;
