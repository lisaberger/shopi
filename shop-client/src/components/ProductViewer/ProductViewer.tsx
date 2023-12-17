/* eslint-disable @typescript-eslint/no-namespace */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import '@google/model-viewer/dist/model-viewer';
import { ModelViewerElement } from '@google/model-viewer/dist/model-viewer';
import QRCode from 'react-qr-code';
import { Button } from 'primereact/button';
import { Annotation } from '@/utils/types/annotation.interface.ts';

import styles from './ProductViewer.module.scss';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

interface ModelViewerJSX {
    src: string;
    poster?: string;
    iosSrc?: string;
    seamlessPoster?: boolean;
    autoplay?: boolean;
    environmentImage?: string;
    exposure?: string;
    interactionPromptThreshold?: string;
    shadowIntensity?: string;
    ar?: boolean;
    arModes?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    cameraOrbit?: string;
    alt?: string;
}

interface ProductViewerProps {
    model: string;
    annotations: Annotation[];
    name: string;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ model, annotations, name }) => {
    const modelRef = useRef<ModelViewerElement>();
    const [variants, setVariants] = useState<string[]>([]);
    const [animations, setAnimations] = useState<string[]>([]);

    // const handleCreateAnnotation = (event: MouseEvent) => {
    //     const { clientX, clientY } = event;

    //     if (modelRef.current) {
    //         const hit = modelRef.current.surfaceFromPoint(clientX, clientY);

    //         console.log(hit);

    //         if (hit) {
    //             setAnnotations((previousAnnotations) => [...previousAnnotations, hit]);
    //         }
    //     }
    // };

    /* initialise and update animations and variants */
    useEffect(() => {
        if (modelRef.current) {
            setVariants([...modelRef.current.availableVariants]);
            setAnimations([...modelRef.current.availableAnimations]);
        }
    }, []);

    if (modelRef.current) {
        modelRef.current.addEventListener('load', () => {
            setVariants([...modelRef.current.availableVariants]);
            setAnimations([...modelRef.current.availableAnimations]);
        });
    }

    const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (modelRef.current) {
            modelRef.current.variantName = event.target.value === 'default' ? null : event.target.value;
        }
    };

    const handleAnimationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (modelRef.current) {
            modelRef.current.animationName = event.target.value;
        }
    };

    /* toggle annotations  */
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
    const handleAnnotationToggle = (index: number) => {
        setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    /* toggle desktop ar overlay */
    const [isActive, setIsActive] = useState(false);

    const handleOpenOverlay = () => {
        setIsActive(true);
    };

    const handleCloseOverlay = () => {
        setIsActive(false);
    };

    /* play and stop an animation */
    const [animationIsRunning, setAnimationIsRunning] = useState(false);
    const animationIcon = animationIsRunning ? 'pi pi-pause' : 'pi pi-play';

    const handleAnimation = () => {
        if (modelRef.current) {
            if (modelRef.current.paused) {
                modelRef.current.play();
                setAnimationIsRunning(true);
            } else {
                modelRef.current.pause();
                setAnimationIsRunning(false);
            }
        }
    };

    return (
        <>
            <article className='h-full relative'>
                <model-viewer
                    className={styles.modelViewer}
                    src={model}
                    // src='/api/media/cabinet.glb'
                    alt={name}
                    camera-controls
                    disable-tap
                    ar
                    ar-modes='webxr scene-viewer quick-look'
                    // onClick={handleCreateAnnotation}
                    ref={modelRef}
                >
                    {annotations?.map((annotation: Annotation, index: number) => (
                        <button
                            onClick={() => handleAnnotationToggle(index)}
                            key={`hotspot-${index}`}
                            className={styles.hotspot}
                            slot={`hotspot-${index}`}
                            data-surface={annotation.surface}
                            data-visibility-attribute='visible'
                        >
                            {index + 1}

                            {visibleIndex === index && (
                                <div className={`${styles.annotation} text-xs text-white bg-black-alpha-70`}>
                                    <p className='font-bold'>{annotation.title}</p>
                                    <p>{annotation.description}</p>
                                </div>
                            )}
                        </button>
                    ))}

                    <div className='flex p-2 gap-2'>
                        {variants.length > 0 && (
                            <div>
                                <select
                                    id='variant'
                                    className='h-full p-2 border-round-sm border-primary text-color'
                                    onChange={() => handleVariantChange}
                                >
                                    <option value='' disabled selected>
                                        Varianten
                                    </option>
                                    {variants.map((variant, index) => (
                                        <option key={index} value={variant}>
                                            {variant}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {animations.length > 0 && (
                            <div>
                                <span className='mr-1'>
                                    <select
                                        id='animation'
                                        className='h-full p-2 border-round-sm border-primary text-color'
                                        onChange={() => handleAnimationChange}
                                    >
                                        <option value='' disabled selected>
                                            Animationen
                                        </option>
                                        {animations.map((animation, index) => (
                                            <option key={index} value={animation}>
                                                {animation}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                                <Button icon={animationIcon} onClick={handleAnimation} />
                            </div>
                        )}
                    </div>
                </model-viewer>

                <Button
                    className='hidden md:block mx-auto'
                    severity='secondary'
                    rounded
                    text
                    label='In AR betrachten'
                    icon='pi pi-box'
                    onClick={handleOpenOverlay}
                />

                {isActive && <Overlay onClose={handleCloseOverlay} />}
            </article>
        </>
    );
};

const Overlay = ({ onClose }) => {
    const qrValue = window.location.href;

    return (
        <div className='bg-black-alpha-90 absolute top-0 text-sm w-full p-4 pb-8'>
            <div className='mb-4 '>
                <Button size='small' label='schließen' rounded text icon='pi pi-times' onClick={() => onClose()} />
            </div>
            <div className='flex flex-column align-items-center text-white gap-4 text-center'>
                <div>
                    <h3>Augmented Reality ist nur auf Smartphones und Tablets möglich!</h3>
                    <p className='text-xs text-500'>Unterstützte Geräte: iPhone 6S+ & iPad 5+ on iOS 12+ und Android 8.0+ mit ARCore 1.9 support</p>
                </div>
                <div className='qr-code flex-shrink-0 bg-white p-2 h-auto max-w-12rem'>
                    <QRCode className='w-full h-auto max-w-full' size={256} value={qrValue} viewBox={`0 0 256 256`} />
                </div>
                <div>
                    <h3>Über QR-Code öffnen:</h3>
                    <p className='text-xs text-500'>Scanne den QR-Code, um das Produkt auf deinem Gerät zu öffnen. Klicke dann auf den AR-Button</p>
                </div>
            </div>
        </div>
    );
};

export default ProductViewer;
