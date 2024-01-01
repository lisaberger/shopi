import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Product360Viewer from '../Product360Viewer/Product360Viewer';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Button } from 'primereact/button';

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [qty, setQty] = useState(1);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <div className='col-12 sm:col-6 lg:col-12 xl:col-4 p-2'>
            <div className='p-3 border-1 surface-border surface-card border-round'>
                <div className='flex flex-wrap align-items-center justify-content-between gap-2 relative'>
                    <div className='flex align-items-center gap-2'>
                        <i className='pi pi-tag'></i>
                        <span className='font-semibold text-s'>{product.category}</span>
                    </div>

                    <span onClick={toggleLike}>
                        {!liked ? (
                            <i className='pi pi-heart' />
                        ) : (
                            <img src='/like.svg' className='absolute top-0' style={{ height: '30px', right: '2px' }} />
                        )}
                    </span>
                </div>

                <div className='flex flex-column align-items-center gap-3 py-4'>
                    <Product360Viewer images={product ? product.images : []} />
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className='text-base font-bold'>{product.name}</h3>
                    <div className='mb-2 flex align-items-center justify-content-between'>
                        <span className='text-base'>€ {product.price}</span>
                    </div>
                </Link>
                <Button
                    severity='secondary'
                    onClick={addToCartHandler}
                    outlined
                    icon='pi pi-shopping-cart'
                    label='Zum Warenkorb hinzufügen'
                    className='w-full'
                />
            </div>
        </div>
    );
};

export default ProductCard;
