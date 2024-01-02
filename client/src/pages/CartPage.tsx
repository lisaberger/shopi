import Product360Viewer from '@/components/Product360Viewer/Product360Viewer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Product } from '@/utils/types/product.interface';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useAppDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <section className='p-4 md:px-8 text-color' style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className='text-xl'>Warenkorb</h1>
            <Link to='/'>
                <Button icon='pi pi-arrow-left' className='mt-4' severity='secondary' size='small' label='Zurück' text outlined />
            </Link>
            <div className='grid p-2 md:px-8'>
                <article className='col-12 md:col-8'>
                    {cartItems.length === 0 ? (
                        <>
                            <p>Warenkorb ist leer</p>
                        </>
                    ) : (
                        <div>
                            {cartItems.map((cartItem: Product, index: number) => (
                                <div className='grid gap-2 align-items-center justify-content-center p-2'>
                                    <div className='col-12 md:col-1'>{index + 1}</div>
                                    <div className='col-12 md:col-2 flex justify-content-center'>
                                        <Product360Viewer images={cartItem.images} />
                                    </div>

                                    <div className='col-12 md:col-3'>
                                        <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
                                    </div>
                                    <div className='md:col-2'>€ {cartItem.price}</div>
                                    <div className='md:col-2'>
                                        <Dropdown
                                            value={cartItem.qty}
                                            options={[...Array(cartItem.countInStock).keys()].map((x) => x + 1)}
                                            onChange={(e) => addToCartHandler(cartItem, Number(e.target.value))}
                                        />
                                    </div>
                                    <div className='md:col-1'>
                                        <Button icon='pi pi-trash' onClick={() => removeFromCartHandler(cartItem._id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </article>
                <aside className='col-12 md:col-4'>
                    <Card>
                        <h2 className='text-xl mb-2'>Summe</h2>
                        <p>€ {cartItems.reduce((sum: number, cartItem: Product) => sum + cartItem.qty * cartItem.price, 0).toFixed(2)}</p>
                        <div className='mt-4'>
                            <Button icon='pi pi-euro' className='w-full' disabled={cartItems.length === 0} label='Zur Kasse' />
                        </div>
                    </Card>
                </aside>
            </div>
        </section>
    );
};

export default CartPage;
