/* eslint-disable @typescript-eslint/no-namespace */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import '@google/model-viewer/dist/model-viewer';
import styles from './ProductViewer.module.scss';
import { ModelViewerElement } from '@google/model-viewer/dist/model-viewer';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

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
    sx?: any;
}

const initalAnnotations = ['1 0 24 25 26 0.416 0.028 0.556'];

const annotationsInit = [
    { surface: '1 0 24 25 26 0.416 0.028 0.556', title: 'Text', description: 'Ein schöner Text' },
    { surface: '5 0 20 21 22 0.543 0.369 0.088', title: 'Text-1', description: 'NOch besser' },
];

const ProductViewer = ({ product }) => {
    const modelRef = useRef<ModelViewerElement>();
    const [annotations, setAnnotations] = useState([]);
    const [variants, setVariants] = useState([]);
    const [animations, setAnimations] = useState([]);

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

    useEffect(() => {
        if (modelRef.current) {
            setAnnotations(annotationsInit);
        }
    }, []);

    modelRef.current?.addEventListener('load', () => {
        setVariants([...modelRef.current.availableVariants]);
        setAnimations([...modelRef.current.availableAnimations]);
    });

    const handleVariantChange = (event: DropdownChangeEvent) => {
        if (modelRef.current) {
            modelRef.current.variantName = event.target.value === 'default' ? null : event.target.value;
        }
    };

    const handleAnimationChange = (event: DropdownChangeEvent) => {
        if (modelRef.current) {
            modelRef.current.animationName = event.target.value;
        }
    };

    const [visible, setVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleAnnotationToggle = () => {
        setVisible(!visible);
    };

    const handleOpenOverlay = () => {
        setIsActive(true);
    };

    const handleCloseOverlay = () => {
        setIsActive(false);
    };

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
                    src='/cabinet.glb'
                    alt='Eine Interaktive Statuen-Grafik'
                    camera-controls
                    ar
                    ar-modes='webxr scene-viewer quick-look'
                    // onClick={handleCreateAnnotation}
                    ref={modelRef}
                >
                    {annotations.map((annotation, index) => (
                        <button
                            onClick={handleAnnotationToggle}
                            key={`hotspot-${index}`}
                            className={styles.Hotspot}
                            slot={`hotspot-${index}`}
                            data-surface={annotation}
                            data-visibility-attribute='visible'
                        >
                            {index + 1}
                            <div className={`${styles.HotspotAnnotation} ${visible ? styles.visible : styles.hidden}`}>{annotation.description}</div>
                        </button>
                    ))}

                    <div className='flex p-2 gap-2'>
                        {variants.length > 0 && (
                            <Dropdown value={variants} options={variants} onChange={handleVariantChange} placeholder='Varianten' />
                        )}

                        {animations.length > 0 && (
                            <div>
                                <Dropdown value={animations} options={animations} onChange={handleAnimationChange} placeholder='Animationen' />
                                <Button icon={animationIcon} onClick={handleAnimation} />
                            </div>
                        )}
                    </div>

                    <div className='progress-bar hide' slot='progress-bar'>
                        <div className='update-bar'></div>
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
            {/* <div style={{ zIndex: 100, position: 'absolute', width: '100%', height: '100%', backgroundColor: '#1C1B1FF2', top: 0 }}> */}
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
