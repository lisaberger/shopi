/* eslint-disable @typescript-eslint/no-namespace */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import '@google/model-viewer/dist/model-viewer';
import styles from './Product.module.scss';
import { ModelViewerElement } from '@google/model-viewer/dist/model-viewer';

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

const Product: React.FC = () => {
    const modelRef = useRef<ModelViewerElement>();
    const [annotations, setAnnotations] = useState([]);
    const [variants, setVariants] = useState([]);
    const [animations, setAnimations] = useState([]);

    // const handleCreateAnnotation = (event: MouseEvent) => {
    //     const { clientX, clientY } = event;

    //     if (modelRef.current) {
    //         const hit = modelRef.current.surfaceFromPoint(clientX, clientY);

    //         if (hit) {
    //             setAnnotations((previousAnnotations) => [...previousAnnotations, hit]);
    //         }
    //     }
    // };

    useEffect(() => {
        if (modelRef.current?.availableVariants) {
            setAnnotations(initalAnnotations);
        }
    }, []);

    modelRef.current?.addEventListener('load', () => {
        setVariants([...modelRef.current.availableVariants]);
        setAnimations([...modelRef.current.availableAnimations]);
    });

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

    const stopAnimationHandler = () => {
        modelRef.current?.pause();
    };
    const startAnimationHandler = () => {
        modelRef.current?.play();
    };

    const [visible, setVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleAnnotationToggle = () => {
        setVisible(!visible);
    };

    const handleCloseOverlay = () => {
        setIsActive(false);
    };

    const handleOpenOverlay = () => {
        setIsActive(true);
    };

    const qrValue = window.location.href;

    return (
        <>
            <article className='h-full' style={{ position: 'relative' }}>
                <model-viewer
                    className={styles.modelViewer}
                    src='/bust-hi.glb'
                    alt='Eine Interaktive Statuen-Grafik'
                    camera-controls
                    auto-rotate
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
                            <div className={`${styles.HotspotAnnotation} ${visible ? styles.visible : styles.hidden}`}>test</div>
                        </button>
                    ))}

                    {variants.length > 0 && (
                        <div>
                            <select id='variant' onChange={handleVariantChange}>
                                <option>Farbvarianten</option>
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
                            <select id='variant' onChange={handleAnimationChange}>
                                <option>Animationen</option>
                                {animations.map((animation, index) => (
                                    <option key={index} value={animation}>
                                        {animation}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className='progress-bar hide' slot='progress-bar'>
                        <div className='update-bar'></div>
                    </div>

                    <button onClick={stopAnimationHandler}>Stop Animation</button>
                    <button onClick={startAnimationHandler}>Start Animation</button>
                </model-viewer>

                <button onClick={handleOpenOverlay}>
                    <i className='pi pi-box'></i>
                </button>

                {isActive && (
                    <div style={{ zIndex: 100, position: 'absolute', width: '100%', height: '100%', backgroundColor: '#1C1B1FF2', top: 0 }}>
                        <i onClick={handleCloseOverlay} className='pi pi-times'></i>
                        <h3>Augmented Reality ist nur auf Smartphones und Tablets möglich!</h3>
                        <p>Unterstützte Geräte: iPhone 6S+ & iPad 5+ on iOS 12+ und Android 8.0+ mit ARCore 1.9 support</p>
                        <div>
                            <QRCode className='qr-code' size={256} value={qrValue} viewBox={`0 0 256 256`} />
                        </div>
                        <p>Über QR-Code öffnen:</p>
                        <p>Scanne den QR-Code, um das Produkt auf deinem Gerät zu öffnen. Klicke dann auf den AR-Button</p>
                    </div>
                )}
            </article>
        </>
    );
};

export default Product;
