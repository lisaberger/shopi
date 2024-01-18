import { Stage, Gltf } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Button } from 'primereact/button';
import { FC, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { OrbitControls } from '@react-three/drei';
import { ITeaserItem } from '@/utils/types/teaser.interface';

import styles from './TeaserItem.component.module.scss';

interface TeaserItemProps {
    teaser: ITeaserItem;
}

const TeaserItem: FC<TeaserItemProps> = ({ teaser }) => {
    return (
        <article
            className='flex flex-column align-items-center justifty-content-center px-2 md:px-8 md:flex-row md:pt-2 md:align-items-start'
            style={{ maxWidth: '80vw', justifyContent: 'center' }}
        >
            <div className='md:w-6 flex flex-column align-items-center mb-3 md:align-items-start'>
                <h1 className='line-height-2 text-center md:text-left text-5xl font-bold max-w-40rem'>{teaser.title}</h1>
                <p className='text-center md:text-left text-light mt-2 max-w-30rem'>{teaser.description}</p>
                <Link to={`/product/${teaser.product._id}`}>
                    <Button className='mt-4 text-color' type='button' label='Mehr erfahren' />
                </Link>
            </div>

            <div className={`${styles.canvas} relative flex justify-content-center`}>
                <Canvas>
                    <Suspense
                        fallback={
                            <Stage environment={{ files: '/small_empty_room_1_1k.hdr' }}>
                                <Gltf src={teaser.product.preview} />
                            </Stage>
                        }
                    >
                        <Stage adjustCamera={true} environment={{ files: '/small_empty_room_1_1k.hdr' }} castShadow>
                            <Gltf src={teaser.product.model} />
                        </Stage>
                    </Suspense>
                    <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI - Math.PI / 4} enableDamping enablePan={false} autoRotate />
                </Canvas>
            </div>
        </article>
    );
};

export default TeaserItem;
