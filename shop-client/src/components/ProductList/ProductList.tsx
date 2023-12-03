import { Canvas } from '@react-three/fiber';
// import useRefs from 'react-use-refs';
import { Suspense, createRef } from 'react';
import { Gltf, Stage } from '@react-three/drei';
import { useRef } from 'react';
import styles from './ProductList.module.scss';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '@/store/slices/productsApiSlice';

interface Product {
    _id: string;
    name: string;
    model: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
}

export default function ProductList() {
    const container = useRef();

    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            <h1>Products</h1>
            <section className={styles.productList}>
                <div className={styles.container}>
                    {products &&
                        products.map((product: Product) => {
                            return (
                                <Link key={product._id} to={'product/' + product._id}>
                                    <article className={styles.card}>
                                        <Canvas>
                                            <Stage>
                                                <Suspense fallback={null}>
                                                    <Gltf src={product.model} />
                                                </Suspense>
                                            </Stage>
                                        </Canvas>
                                        <p className={styles.card_title}>{product.name}</p>
                                    </article>
                                </Link>
                            );
                        })}
                </div>
                {/* <div className={styles.container} ref={container}>
                    {products &&
                        products.map((product, i) => {
                            return (
                                <Link key={i} to={'product/' + product.id}>
                                    <article className={styles.card}>
                                        <div ref={viewRefs[i]} className={styles.view} />
                                        <p className={styles.card_title}>iPhone X</p>
                                    </article>
                                </Link>
                            );
                        })}

                    <Canvas className={styles.canvas} eventSource={container}>
                        {products &&
                            viewRefs > 0 &&
                            products.map((product, i) => {
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
                </div> */}
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
            {/* <OrbitControls /> */}
        </>
    );
}
