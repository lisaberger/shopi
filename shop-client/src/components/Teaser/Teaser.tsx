import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Suspense, useEffect, useState } from 'react';
import { Gltf, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from './Teaser.module.scss';
import { useGetTeasersQuery } from '@/store/slices/teasersApiSlice';
import { Product } from '@/utils/types/product.interface';

interface CarouselItem {
    id: string;
    description: string;
    title: string;
    product: Product;
}

const Teaser = () => {
    const [productTeaser, setProductTeaser] = useState<CarouselItem[]>([]);

    const { data: teasers, isLoading, error } = useGetTeasersQuery();

    useEffect(() => {
        setProductTeaser(teasers);
    }, [teasers]);

    const teaserTemplate = (teaser: CarouselItem) => {
        return (
            <>
                {isLoading && <p>Teaser wird geladen ...</p>}
                {error && <p>Teaser konnte nicht geladen werden.</p>}
                <article
                    className='flex flex-column align-items-center justifty-content-center pt-3 px-2 md:px-8 md:flex-row md:pt-4 md:align-items-start'
                    style={{ maxWidth: '80vw', margin: '0 auto' }}
                >
                    <div className='md:w-6 flex flex-column align-items-center mb-3 md:align-items-start'>
                        <h1 className='text-5xl font-semibold'>{teaser.title}</h1>
                        <p className='mt-2 max-w-30rem'>{teaser.description}</p>
                        <Button className='mt-4' type='button' label='Mehr erfahren' icon='pi pi-bell' outlined />
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
                            <OrbitControls enableDamping enablePan={false} />
                        </Canvas>
                    </div>
                </article>
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
