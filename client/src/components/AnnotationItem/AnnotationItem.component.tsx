import { FC, useState } from 'react';
import styles from './AnnotationItem.component.module.scss';
import { IAnnotation } from '@/utils/types/annotation.interface';

interface AnnotationItemProps {
    annotation: IAnnotation;
    index: number;
    onAnnotationClicked: ({ dataOrbit, dataTarget }: { dataOrbit: string; dataTarget: string }) => void;
}

const AnnotationItem: FC<AnnotationItemProps> = ({ annotation, index, onAnnotationClicked }) => {
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
                    <p className='font-bold text-primary'>{annotation.title}</p>
                    <p className='font-regular'>{annotation.description}</p>
                </div>
            )}
        </button>
    );
};

export default AnnotationItem;
