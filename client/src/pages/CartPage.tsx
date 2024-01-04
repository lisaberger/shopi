import CartItem from '@/components/CartItem/CartItem.component';
import { useAppSelector } from '@/store/hooks';
import { ICartItem } from '@/utils/types/cart.interface';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart);
    const { cartItems } = cart;

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
                            {cartItems.map((cartItem: ICartItem, index: number) => (
                                <CartItem key={cartItem._id} cartItem={cartItem} index={index} />
                            ))}
                        </div>
                    )}
                </article>
                <aside className='col-12 md:col-4'>
                    <Card>
                        <h2 className='text-xl mb-2'>Summe</h2>
                        <p>€ {cartItems.reduce((sum: number, cartItem: ICartItem) => sum + cartItem.qty * cartItem.price, 0).toFixed(2)}</p>
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
