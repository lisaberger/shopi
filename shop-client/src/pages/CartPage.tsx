import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    console.log('cartitems', cartItems);

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <section className='grid p-4 md:px-8' style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <article className='md:col-8'>
                <h1 className='text-xl'>Warenkorb</h1>
                {cartItems.length === 0 ? (
                    <>
                        <p>Warenkorb ist leer</p>
                        <Link to='/'>Zurück zur Übersicht</Link>
                    </>
                ) : (
                    <div>
                        {cartItems.map((cartItem) => (
                            <div className='grid'>
                                <div className='md:col-2'>
                                    <p>Image</p>
                                </div>

                                <div className='md:col-3'>
                                    <Link to=''>{cartItem.name}</Link>
                                </div>
                                <div className='md:col-2'>{cartItem.price}</div>
                                <div className='md:col-2'>
                                    <Dropdown
                                        value={cartItem.qty}
                                        options={[...Array(cartItem.countInStock).keys()].map((x) => x + 1)}
                                        onChange={(e) => addToCartHandler(cartItem, Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <Button onClick={() => removeFromCartHandler(cartItem._id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </article>
            <aside className='md:col-4'>
                <Card>
                    <h2>Summe</h2>€{cartItems.reduce((acc, cartItem) => acc + cartItem.qty * cartItem.price, 0).toFixed(2)}
                    <Button>Zur Kasse</Button>
                </Card>
            </aside>
        </section>
    );
};

export default CartPage;
