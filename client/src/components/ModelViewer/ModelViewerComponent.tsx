/* eslint-disable @typescript-eslint/no-namespace */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ModelViewerElement } from '@google/model-viewer/dist/model-viewer';
import AnnotationItemComponent from '../AnnotationItem/AnnotationItemComponent';
import VariantDropdownComponent from '../VariantDropdown/VariantDropdownComponent';
import AnimationDropdownComponent from '../AnimationDropdown/AnimationDropdownComponent';
import { Annotation } from '@/utils/types/annotation.interface';
import styles from './ModelViewerComponent.module.scss';

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

interface ModelViewerComponent {
    model: string;
    annotations: Annotation[];
    name: string;
}

const ModelViewerComponent: React.FC<ModelViewerComponent> = ({ model, annotations, name }) => {
    const modelRef = useRef<ModelViewerElement>();
    const [variants, setVariants] = useState<string[]>([]);
    const [animations, setAnimations] = useState<string[]>([]);
    const [animationIsRunning, setAnimationIsRunning] = useState(false);

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
        <model-viewer
            className={styles.modelViewer}
            src={model}
            alt={name}
            camera-controls
            disable-tap
            ar
            ar-modes='webxr scene-viewer quick-look'
            ref={modelRef}
        >
            {annotations?.map((annotation: Annotation, index: number) => <AnnotationItemComponent annotation={annotation} index={index} />)}

            <div className='flex p-2 gap-2'>
                {variants.length > 0 && <VariantDropdownComponent variantOptions={variants} onVariantChange={handleVariantChange} />}
                {animations.length > 0 && (
                    <AnimationDropdownComponent
                        animationOptions={animations}
                        onAnimationChange={handleAnimationChange}
                        onToggleAnimation={handleAnimation}
                        animationIsRunning={animationIsRunning}
                    />
                )}
            </div>
        </model-viewer>
    );
};

export default ModelViewerComponent;
