import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Gltf, Stage } from '@react-three/drei';
import styles from './ProductList.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState('');
    const [categories, setCategories] = useState('');

    const params = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    useEffect(() => {
        setSearchParams({
            search: searchInput,
            categories: 'Electronics',
        });
    }, [categories, searchInput, setSearchParams]);

    const { data: products, isLoading, error } = useGetProductsQuery(params);

    return (
        <>
            <h1>Products</h1>
            <input
                type='text'
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
            />
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
            </section>
        </>
    );
}
