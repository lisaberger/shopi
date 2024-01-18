/* eslint-disable @typescript-eslint/no-namespace */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ModelViewerElement } from '@google/model-viewer/dist/model-viewer';
import AnnotationItem from '../AnnotationItem/AnnotationItem.component';
import VariantDropdown from '../VariantDropdown/VariantDropdown.component';
import AnimationDropdown from '../AnimationDropdown/AnimationDropdown.component';
import { IAnnotation } from '@/utils/types/annotation.interface';
import styles from './ModelViewer.component.module.scss';
import { Canvas } from '@react-three/fiber';
import { Stage, Gltf } from '@react-three/drei';
import { ProgressBar } from 'primereact/progressbar';

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

interface ModelViewerProps {
    model: string;
    annotations: IAnnotation[];
    name: string;
    preview: string;
}

const ModelViewerComponent: React.FC<ModelViewerProps> = ({ preview, model, annotations, name }) => {
    const modelRef = useRef<ModelViewerElement>();
    const [variants, setVariants] = useState<string[]>([]);
    const [animations, setAnimations] = useState<string[]>([]);
    const [animationIsRunning, setAnimationIsRunning] = useState(false);

    /**
     * function to get model surface and position values (example annotations)
     */
    // const handleCreateAnnotation = (event: MouseEvent) => {
    //     const { clientX, clientY } = event;

    //     if (modelRef.current) {
    //         const hit = modelRef.current.surfaceFromPoint(clientX, clientY);
    //         const hitdata = modelRef.current.positionAndNormalFromPoint(clientX, clientY);

    //         console.log('surface', hit, 'position + normal', hitdata?.position.toString());
    //     }
    // };

    /**
     * initialise and update animations and variants
     */
    useEffect(() => {
        if (modelRef.current) {
            setVariants([...modelRef.current.availableVariants]);
            setAnimations([...modelRef.current.availableAnimations]);
        }
    }, []);

    if (modelRef.current) {
        modelRef.current.addEventListener('load', () => {
            if (modelRef.current) {
                setVariants([...modelRef.current.availableVariants]);
                setAnimations([...modelRef.current.availableAnimations]);
            }
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

    const handleAnnotationClick = ({ dataOrbit, dataTarget }) => {
        if (modelRef.current) {
            modelRef.current.cameraTarget = dataTarget;
            modelRef.current.cameraOrbit = dataOrbit;
            modelRef.current.fieldOfView = '45deg';
        }
    };

    /**
     * custom loading bar
     */
    const [loadingValue, setloadingValue] = useState(0);

    const onProgress = (event) => {
        setloadingValue(Math.round(event.detail.totalProgress * 100));
    };

    if (modelRef.current) {
        modelRef.current.addEventListener('progress', onProgress);
    }

    return (
        <model-viewer
            className={styles.modelViewer}
            src={model}
            alt={name}
            camera-controls
            shadowIntensity='1'
            ar
            ar-modes='webxr scene-viewer quick-look'
            ref={modelRef}
            // onClick={handleCreateAnnotation}
        >
            {annotations?.map((annotation: IAnnotation, index: number) => (
                <AnnotationItem key={index} annotation={annotation} index={index} onAnnotationClicked={handleAnnotationClick} />
            ))}

            <div className='flex p-2 gap-2'>
                {variants.length > 0 && <VariantDropdown variantOptions={variants} onVariantChange={handleVariantChange} />}
                {animations.length > 0 && (
                    <AnimationDropdown
                        animationOptions={animations}
                        onAnimationChange={handleAnimationChange}
                        onToggleAnimation={handleAnimation}
                        animationIsRunning={animationIsRunning}
                    />
                )}
            </div>

            <div slot='progress-bar'>
                {loadingValue !== 100 && (
                    <div className='flex flex-column justify-content-center align-items-center h-full w-full'>
                        <ProgressBar className='w-full' value={loadingValue} />
                        {preview && (
                            <Canvas>
                                <Stage>
                                    <Gltf src={preview} />
                                </Stage>
                            </Canvas>
                        )}
                    </div>
                )}
            </div>
        </model-viewer>
    );
};

export default ModelViewerComponent;
