import { useState } from 'react';
import styles from './AnnotationItemComponent.module.scss';
import { Annotation } from '@/utils/types/annotation.interface';

interface AnnotationItemComponent {
    annotation: Annotation;
    index: number;
    onAnnotationClicked: ({ dataTarget: string, dataTarget: string }) => void;
}

const AnnotationItemComponent: React.FC<AnnotationItemComponent> = ({ annotation, index, onAnnotationClicked }) => {
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

    const handleAnnotationToggle = (index: number) => {
        setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
        if (annotation.cameraOrbit && annotation.cameraTarget) {
            onAnnotationClicked({ dataOrbit: annotation.cameraOrbit, dataTarget: annotation.cameraTarget });
        }
    };

    return (
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
    );
};

export default AnnotationItemComponent;