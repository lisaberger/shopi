import Product360Viewer from '@/components/Product360Viewer/Product360ViewerComponent';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Button } from 'primereact/button';
import { CartItem } from '@/utils/types/cart.interface';

interface CartItemComponent {
    cartItem: CartItem;
    index: number;
}

const CartItemComponent: React.FC<CartItemComponent> = ({ cartItem, index }) => {
    const dispatch = useAppDispatch();
    const addToCartHandler = (product: CartItem, qty: number) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
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
    );
};

export default CartItemComponent;
