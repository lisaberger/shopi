import { useGetProductsQuery } from '@/store/slices/productsApiSlice';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, View, Bounds, Stage, Gltf, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo, createRef, Suspense } from 'react';
import styles from './ProductCarousel.component.module.scss';

const ProductCarousel = ({ items: products }) => {
    const container = useRef();
    const viewRefs = useMemo(() => products?.map(() => createRef()), [products]);

    console.log(products);

    return (
        <>
            <section className={styles.productList}>
                {products && (
                    <div className={styles.container} ref={container}>
                        {products?.map((product, i) => {
                            return (
                                <article className={styles.card} key={i}>
                                    <div className={styles.view} ref={viewRefs[i]} />
                                    <p>{product.name}</p>
                                </article>
                            );
                        })}

                        <Canvas eventSource={container} className={styles.canvas}>
                            {products?.map((product, i) => {
                                return (
                                    <View key={i} index={1} track={viewRefs[i]}>
                                        <Suspense fallback={<Gltf src={product.preview} />}>
                                            <Stage fit clip observe adjustCamera='true' center>
                                                <Gltf src={product.model} />
                                                {/* <OrbitControls /> */}
                                            </Stage>
                                        </Suspense>
                                    </View>
                                );
                            })}
                        </Canvas>
                    </div>
                )}
            </section>
        </>
    );
};

export default ProductCarousel;
