import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Gltf, Stage } from '@react-three/drei';
import AnimatedGltfModel from '../AnimatedProductModel';

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
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
                <Link to={`/product/${product._id}`}>
                    <div className='flex flex-column align-items-center gap-3 py-4'>
                        <Canvas>
                            <Stage>
                                <Suspense fallback={null}>{<Gltf src={product.model} />}</Suspense>
                            </Stage>
                        </Canvas>
                    </div>
                </Link>
                <h3 className='pb-2 text-lg font-bold'>{product.name}</h3>
                <div className='flex align-items-center justify-content-between'>
                    <span className='text-base'>$12</span>
                    <i className='pi pi-shopping-cart'></i>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
