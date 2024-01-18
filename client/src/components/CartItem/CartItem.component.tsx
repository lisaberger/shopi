import Product360Viewer from '@/components/Product360Viewer/Product360Viewer.component';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Button } from 'primereact/button';
import { ICartItem } from '@/utils/types/cart.interface';
import { FC } from 'react';
import { addToWishlist } from '@/store/slices/wishlistSlice';

interface CartItemProps {
    cartItem: ICartItem;
    index: number;
}

const CartItem: FC<CartItemProps> = ({ cartItem, index }) => {
    const dispatch = useAppDispatch();
    const addToCartHandler = (product: ICartItem, qty: number) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const addToWishlistHandler = (product, qty: number) => {
        dispatch(addToWishlist({ ...product, qty }));
        dispatch(removeFromCart(product._id));
    };

    return (
        <div className='grid gap-2 align-items-center justify-content-center p-2 text-color-secondary'>
            <div className='col-12 md:col-1'>{index + 1}</div>
            <div className='bg-white col-12 md:col-2 flex justify-content-center'>
                <Product360Viewer images={cartItem.images} />
            </div>

            <div className='col-12 md:col-3'>
                <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
            </div>
            <div className='md:col-2'>€ {cartItem.price}</div>
            <div className='md:col-1'>
                <Dropdown
                    value={cartItem.qty}
                    options={[...Array(cartItem.countInStock).keys()].map((x) => x + 1)}
                    onChange={(event) => addToCartHandler(cartItem, Number(event.target.value))}
                />
            </div>
            <div className='md:col-2 flex gap-2 md:ml-2'>
                <Button icon='pi pi-trash' onClick={() => removeFromCartHandler(cartItem._id)} />
                <Button icon='pi pi-heart' severity='secondary' outlined onClick={() => addToWishlistHandler(cartItem, 1)} />
            </div>
        </div>
    );
};

export default CartItem;
