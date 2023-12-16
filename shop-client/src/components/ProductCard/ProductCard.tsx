import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Gltf, Stage } from '@react-three/drei';
import AnimatedGltfModel from '../AnimatedProductModel';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const ProductCard = ({ product }) => {
    return (
        <div className='col-12 sm:col-6 lg:col-12 xl:col-4 p-2'>
            <div className='p-3 border-1 surface-border surface-card border-round'>
                <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
                    <div className='flex align-items-center gap-2'>
                        <i className='pi pi-tag'></i>
                        <span className='font-semibold text-s'>{product.category}</span>
                    </div>
                    <i className='pi pi-heart'></i>
                </div>
                <Link to={`/product/${product._id}`}>
                    <div className='flex flex-column align-items-center gap-3 py-4'>
                        <Canvas className='flex-grow-1'>
                            <Stage>
                                <Suspense fallback={null}>
                                    {
                                        <Gltf src={product.model} />
                                        /* <AnimatedGltfModel model={product.model} /> */
                                    }
                                </Suspense>
                            </Stage>
                        </Canvas>
                    </div>
                </Link>
                <h3 className='py-2 text-s font-semibold'>{product.name}</h3>
                <Rating value={3.5} readOnly cancel={false}></Rating>
                <div className='flex align-items-center justify-content-between'>
                    <span className='text-l font-semibold'>$12</span>
                    <Button severity='secondary' icon='pi pi-shopping-cart'></Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
