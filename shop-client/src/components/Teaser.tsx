import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Gltf, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

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
            <article className='flex align-items-center border-1 surface-border border-round	m-2 py-3 px-3 h-20rem'>
                <div className='max-w-26rem'>
                    <h1 className='text-5xl font-semibold'>{teaser.title}</h1>
                    <p className='mt-2'>{teaser.description}</p>
                    <Button className='mt-4' type='button' label='Mehr erfahren' icon='pi pi-bell' outlined />
                </div>
                <Canvas className='h-full' style={{ height: 'inherit' }}>
                    <Stage adjustCamera intensity={0.5} shadows='contact' environment='city'>
                        <Gltf src={teaser.image} />
                    </Stage>
                    <OrbitControls />
                </Canvas>
            </article>
        );
    };

    useEffect(() => {
        setProductTeaser(ProductService.getProductsData());
    }, []);

    return (
        <div className='card'>
            <Carousel value={productTeaser} numVisible={1} numScroll={1} itemTemplate={teaserTemplate} />
        </div>
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
                image: './iphone.gltf',
            },
            {
                id: '2',
                name: 'macbook',
                title: 'Entdecke das neue Macbook.',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
                image: './macbook.gltf',
            },
            {
                id: '3',
                name: 'headphones',
                title: 'Entdecke die neuen Headphones.',
                description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
                image: './headphones.gltf',
            },
        ];
    },
};
