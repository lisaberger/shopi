import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Product360Viewer from '../Product360Viewer/Product360Viewer.component';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Button } from 'primereact/button';
import { IProduct } from '@/utils/types/product.interface';
import { ProgressBar } from 'primereact/progressbar';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
interface ProductCardProps {
    product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [qty] = useState(1);
    const [selected, setSelected] = useState(false);
    const [loadingBar, setLoadingBar] = useState(true);
    const [isCartItem, setIsCartItem] = useState(false);

    const { wishlistItems } = useAppSelector((state) => state.wishlist);
    const { cartItems } = useAppSelector((state) => state.cart);

    useEffect(() => {
        if (wishlistItems.some((wishlistItem) => wishlistItem._id === product._id)) {
            setLiked(true);
        }
    }, [product._id, wishlistItems]);

    useEffect(() => {
        if (cartItems.some((cartItem) => cartItem._id === product._id)) {
            setIsCartItem(true);
        }
    }, [product._id, cartItems]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const wishlistHandler = () => {
        const isItemInWishlist = wishlistItems.some((wishlistItem) => wishlistItem._id === product._id);

        if (isItemInWishlist) {
            dispatch(removeFromWishlist(product._id));
            setLiked(false);
        } else {
            dispatch(addToWishlist({ ...product, qty }));
            setLiked(true);
        }
    };

    const onSelectHandler = () => {
        setSelected(true);
    };

    useEffect(() => {
        if (selected) {
            setLoadingBar(true);
            const timeout = setTimeout(() => setLoadingBar(false), 1000);

            return () => clearTimeout(timeout);
        }
    }, [selected]);

    const buttonLabel = isCartItem ? 'Bereits im Warenkorb' : 'Zum Warenkorb hinzufügen';

    return (
        <div className='col-12 sm:col-6 lg:col-12 xl:col-4 p-2'>
            <div className='p-3 border-1 surface-border surface-card border-round'>
                <div className='flex flex-wrap align-items-center justify-content-between gap-2 relative'>
                    <div className='flex align-items-center gap-2'>
                        <i className='pi pi-tag'></i>
                        <span className='font-semibold text-s'>{product.category.name}</span>
                    </div>

                    <span onClick={wishlistHandler}>
                        {!liked ? (
                            <i className='pi pi-heart' />
                        ) : (
                            <img src='/like.svg' className='absolute top-0' style={{ height: '30px', right: '2px' }} />
                        )}
                    </span>
                </div>

                <div className='flex flex-column align-items-center gap-3 py-4' onMouseEnter={onSelectHandler} onTouchStart={onSelectHandler}>
                    <Product360Viewer images={selected ? product.images : [product.poster]} />
                    {selected && loadingBar && <ProgressBar mode='indeterminate' style={{ height: '6px' }} className='w-full' />}
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className='text-base font-bold'>{product.name}</h3>
                    <div className='mb-2 flex align-items-center justify-content-between'>
                        <span className='text-base text-color-secondary'>€ {product.price}</span>
                    </div>
                </Link>
                <Button
                    severity='secondary'
                    onClick={addToCartHandler}
                    outlined
                    icon='pi pi-shopping-cart'
                    label={buttonLabel}
                    className='w-full'
                    disabled={isCartItem}
                />
            </div>
        </div>
    );
};

export default ProductCard;
