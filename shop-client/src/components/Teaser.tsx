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
                <article className='flex align-items-center m-2 py-3 mb-6 px-5 h-20rem'>
                    <div className='max-w-26rem'>
                        <h1 className='text-5xl font-semibold'>{teaser.title}</h1>
                        <p className='mt-2'>{teaser.description}</p>
                        <Button className='mt-4' type='button' label='Mehr erfahren' icon='pi pi-bell' outlined />
                    </div>
                    <Canvas style={{ height: '500px', width: '500px' }}>
                        <Suspense
                            fallback={
                                <Stage>
                                    <Gltf src='/api/media/macbook/low/macbook-low.glb' />
                                </Stage>
                            }
                        >
                            <Stage adjustCamera intensity={0.5} shadows='contact' environment='city'>
                                <Gltf src={teaser.image} />
                            </Stage>
                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </article>
            </>
        );
    };

    useEffect(() => {
        setProductTeaser(ProductService.getProductsData());
    }, []);

    return (
        <section className={`${styles.teaser} px-8 pt-3 mb-8 text-white`}>
            <Carousel
                autoplayInterval={8000}
                className='custom-carousel'
                circular
                value={productTeaser}
                numVisible={1}
                numScroll={1}
                itemTemplate={teaserTemplate}
            />
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
