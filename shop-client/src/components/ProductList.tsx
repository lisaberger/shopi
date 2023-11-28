import { Canvas } from '@react-three/fiber';
// import useRefs from 'react-use-refs';
import { Suspense, createRef } from 'react';
import { Bounds, OrbitControls, PerspectiveCamera, View, Gltf } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import styles from './ProductList.module.scss';

export default function ProductList() {
    const container = useRef();

    const products = [
        { id: '1', model: './headphones.gltf' },
        { id: '2', model: './iphone.gltf' },
        { id: '1', model: './headphones.gltf' },
        { id: '2', model: './iphone.gltf' },
        { id: '3', model: 'macbook.gltf' },
        { id: '1', model: './headphones.gltf' },
        { id: '2', model: './iphone.gltf' },
        { id: '1', model: './headphones.gltf' },
        { id: '2', model: './iphone.gltf' },
        { id: '3', model: 'macbook.gltf' },
    ];

    const viewRefs = useMemo(() => products.map(() => createRef()), [products]);

    return (
        <>
            <h1>Products</h1>
            <section className={styles.productList}>
                <div className={styles.container} ref={container}>
                    {products.map((product, i) => {
                        return (
                            <article key={i} className={styles.card}>
                                <div ref={viewRefs[i]} className={styles.view} />
                                <p className={styles.card_title}>iPhone X</p>
                            </article>
                        );
                    })}

                    <Canvas className={styles.canvas} eventSource={container}>
                        {products.map((product, i) => {
                            return (
                                <View key={i} index={1} track={viewRefs[i]}>
                                    <ProductEnvironment />
                                    <Bounds fit clip observe>
                                        <Suspense fallback={null}>
                                            <Gltf src={product.model} />
                                        </Suspense>
                                    </Bounds>
                                </View>
                            );
                        })}
                    </Canvas>
                </div>
            </section>
        </>
    );
}

function ProductEnvironment() {
    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[20, 30, 10]} />
            <pointLight position={[-10, -10, -10]} color='blue' />
            <PerspectiveCamera makeDefault position={[-2.5, 0, 5]} fov={35} />
            <OrbitControls autoRotate />
        </>
    );
}
