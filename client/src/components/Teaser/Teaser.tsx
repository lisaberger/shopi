import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Suspense, useEffect, useState } from 'react';
import { Gltf, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from './Teaser.module.scss';
import { useGetTeasersQuery } from '@/store/slices/teasersApiSlice';
import { Product } from '@/utils/types/product.interface';
import { Link } from 'react-router-dom';

interface CarouselItem {
    id: string;
    description: string;
    title: string;
    product: Product;
}

const Teaser = () => {
    const [productTeaser, setProductTeaser] = useState<CarouselItem[]>([]);

    const { data: teasers, isLoading, error } = useGetTeasersQuery({});

    useEffect(() => {
        setProductTeaser(teasers);
    }, [teasers]);

    const teaserTemplate = (teaser: CarouselItem) => {
        return (
            <>
                {isLoading && <p>Teaser wird geladen ...</p>}
                {error && <p>Teaser konnte nicht geladen werden.</p>}
                {teasers && (
                    <article
                        className='flex flex-column align-items-center justifty-content-center pt-3 px-2 md:px-8 md:flex-row md:pt-4 md:align-items-start'
                        style={{ maxWidth: '80vw', justifyContent: 'center' }}
                    >
                        <div className='md:w-6 flex flex-column align-items-center mb-3 md:align-items-start'>
                            <h1 className='text-5xl font-semibold max-w-25rem'>{teaser.title}</h1>
                            <p className='mt-2 max-w-20rem'>{teaser.description}</p>
                            <Link to={`/product/${teaser.product._id}`}>
                                <Button className='mt-4 text-color' type='button' label='Mehr erfahren' icon='pi pi-bell' />
                            </Link>
                        </div>

                        <div className={`${styles.canvas} relative flex justify-content-center`} style={{ touchAction: 'none' }}>
                            <Canvas>
                                <Suspense
                                    fallback={
                                        <Stage>
                                            <Gltf src={teaser.product.preview} />
                                        </Stage>
                                    }
                                >
                                    <Stage adjustCamera={true}>
                                        <Gltf src={teaser.product.model} />
                                    </Stage>
                                </Suspense>
                                <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI - Math.PI / 4} enableDamping enablePan={false} />
                            </Canvas>
                        </div>
                    </article>
                )}
            </>
        );
    };

    return (
        <section className='relative'>
            <div className={`${styles.teaser} absolute`} />
            <div className='px-4 md:px-8 pt-3 text-white mb-2'>
                <Carousel value={productTeaser} numVisible={1} numScroll={1} itemTemplate={teaserTemplate} />
            </div>
        </section>
    );
};

export default Teaser;
