import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Suspense, useEffect, useState } from 'react';
import { Gltf, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from './Teaser.module.scss';

interface CarouselItem {
    id: string;
    name: string;
    title: string;
    description: string;
    image: string;
}

const Teaser = () => {
    const [productTeaser, setProductTeaser] = useState<CarouselItem[]>([]);

    const teaserTemplate = (teaser: CarouselItem) => {
        return (
            <>
                <article className='flex flex-column justifty-content-center pt-3 px-2 md:px-8 md:flex-row  md:pt-4'>
                    <div className='md:w-6'>
                        <h1 className='text-5xl font-semibold'>{teaser.title}</h1>
                        <p className='mt-2'>{teaser.description}</p>
                        <Button className='mt-4' type='button' label='Mehr erfahren' icon='pi pi-bell' outlined />
                    </div>

                    <div className={`${styles.canvas} relative flex justify-content-center`} style={{ touchAction: 'none' }}>
                        <Canvas>
                            <Suspense
                                fallback={
                                    <Stage>
                                        <Gltf src='./macbook-low-poly.glb' />
                                    </Stage>
                                }
                            >
                                <Stage adjustCamera={true}>
                                    <Gltf src={teaser.image} />
                                </Stage>
                            </Suspense>
                            <OrbitControls enableDamping enablePan={false} />
                        </Canvas>
                    </div>
                </article>
            </>
        );
    };

    useEffect(() => {
        setProductTeaser(ProductService.getProductsData());
    }, []);

    return (
        <section className='relative'>
            <div className={`${styles.teaser} absolute`} />
            <div className='px-4 md:px-8 pt-3 md:mb-8 text-white'>
                <Carousel value={productTeaser} numVisible={1} numScroll={1} itemTemplate={teaserTemplate} />
            </div>
        </section>
    );
};

export default Teaser;

export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1',
                name: 'iphone',
                title: 'Entdecke das neue iPhone.',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
                image: '/api/media/phone/hi/iphone-hi.gltf',
            },
            {
                id: '2',
                name: 'macbook',
                title: 'Entdecke das neue Macbook.',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
                image: '/api/media/macbook/hi/macbook-hi.gltf',
            },
            {
                id: '3',
                name: 'headphones',
                title: 'Entdecke die neuen Headphones.',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
                image: '/api/media/headphones/hi/headphones-hi.gltf',
            },
        ];
    },
};
