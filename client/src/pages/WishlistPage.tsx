import Product360Viewer from '@/components/Product360Viewer/Product360Viewer.component';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const wishlist = useAppSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;

    const dispatch = useAppDispatch();
    const addToWishlistHandler = (product, qty: number) => {
        dispatch(addToWishlist({ ...product, qty }));
    };

    const removeFromWishlistHandler = (id: string) => {
        dispatch(removeFromWishlist(id));
    };

    const addToCartHandler = (product, qty: number) => {
        dispatch(addToCart({ ...product, qty }));
    };

    return (
        <section className='p-4 md:px-8 text-color' style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link to='/'>
                <Button icon='pi pi-arrow-left' severity='secondary' size='small' label='Zurück' text outlined />
            </Link>
            <h1 className='text-xl font-bold mt-4'>Merkliste</h1>
            <Divider />

            <article className='col-12'>
                <div className='hidden lg:flex grid gap-2 mt-2 justify-content-center'>
                    <p className='col-12 md:col-1 text-sm font-medium'>Artikel</p>
                    <p className='col-12 md:col-2 text-sm font-medium'>Vorschau</p>
                    <p className='col-12 md:col-3 text-sm font-medium'>Bezeichnung</p>
                    <p className='md:col-1 text-sm font-medium'>Preis</p>
                    <p className='md:col-1 text-sm font-medium'>Menge</p>
                    <p className='md:col-3 text-sm font-medium'></p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className='flex justify-content-center'>
                        <span className='mt-2 text-sm text-color-secondary flex align-items-center'>
                            <i className=' text-sm mr-1 pi pi-info-circle' />
                            <p>Der Warenkorb ist leer</p>
                        </span>
                    </div>
                ) : (
                    <div>
                        {wishlistItems.map((wishlistItem, index: number) => (
                            <div key={wishlistItem._id} className='grid gap-2 align-items-center justify-content-center p-2 text-color-secondary'>
                                <div className='col-12 md:col-1'>{index + 1}</div>
                                <div className='bg-white col-12 md:col-2 flex justify-content-center'>
                                    <Product360Viewer images={wishlistItem.images} />
                                </div>

                                <div className='col-12 md:col-3'>
                                    <Link to={`/product/${wishlistItem._id}`}>{wishlistItem.name}</Link>
                                </div>
                                <div className='md:col-1'>€ {wishlistItem.price}</div>
                                <div className='md:col-1'>
                                    <Dropdown
                                        value={wishlistItem.qty}
                                        options={[...Array(wishlistItem.countInStock).keys()].map((x) => x + 1)}
                                        onChange={(event) => addToWishlistHandler(wishlistItem, Number(event.target.value))}
                                    />
                                </div>
                                <div className='md:col-3 flex gap-2'>
                                    <Button icon='pi pi-trash' onClick={() => removeFromWishlistHandler(wishlistItem._id)} />
                                    <Button
                                        severity='secondary'
                                        onClick={() => addToCartHandler(wishlistItem, 1)}
                                        outlined
                                        icon='pi pi-shopping-cart'
                                        label='In den Warenkorb'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </article>
        </section>
    );
};

export default WishlistPage;
