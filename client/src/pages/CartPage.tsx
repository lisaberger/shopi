import CartItem from '@/components/CartItem/CartItem.component';
import { useAppSelector } from '@/store/hooks';
import { ICartItem } from '@/utils/types/cart.interface';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <section className='p-4 md:px-8 text-color' style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link to='/'>
                <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
            </Link>
            <h1 className='text-xl font-bold mt-4'>Warenkorb</h1>
            <Divider />

            <div className='grid'>
                <article className='col-12 md:col-8'>
                    <div className='hidden lg:flex grid gap-2 mt-2 justify-content-center'>
                        <p className='col-12 md:col-1 text-sm font-medium'>Artikel</p>
                        <p className='col-12 md:col-2 text-sm font-medium'>Produktvorschau</p>
                        <p className='col-12 md:col-3 text-sm font-medium'>Bezeichnung</p>
                        <p className='md:col-2 text-sm font-medium'>Preis</p>
                        <p className='md:col-2 text-sm font-medium'>Menge</p>
                        <p className='md:col-1 text-sm font-medium'></p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className='flex justify-content-center'>
                            <span className='mt-2 text-sm text-color-secondary flex align-items-center'>
                                <i className=' text-sm mr-1 pi pi-info-circle' />
                                <p>Der Warenkorb ist leer</p>
                            </span>
                        </div>
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
                        <h2 className='text-xl mb-1 font-bold'>Summe</h2>
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
