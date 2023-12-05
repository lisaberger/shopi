import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Gltf, Stage } from '@react-three/drei';
import AnimatedGltfModel from '../AnimatedProductModel';

import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
    return (
        <Link to={'product/' + product._id}>
            <article className={styles.card}>
                <Canvas>
                    <Stage>
                        <Suspense fallback={null}>
                            <AnimatedGltfModel model={product.model} />
                        </Suspense>
                    </Stage>
                </Canvas>
                <p className={styles.card_title}>{product.name}</p>
            </article>
        </Link>
    );
};

export default ProductCard;
