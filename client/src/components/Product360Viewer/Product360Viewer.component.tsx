import { FC, useState } from 'react';
import { ReactImageTurntable } from 'react-image-turntable';
import { KeyboardEvent } from 'react';

interface Product360ViewerProps {
    images: string[];
}

const Product360Viewer: FC<Product360ViewerProps> = ({ images }) => {
    const [rotationDisabled, setRotationDisabled] = useState(false);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (rotationDisabled) return;

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            setRotationDisabled(true);
        }
    };

    return (
        <div className={`${images.length > 1 ? 'cursor-move' : 'cursor-pointer'}`}>
            {images && (
                <ReactImageTurntable
                    images={images}
                    autoRotate={{ disabled: true }}
                    onPointerDown={() => setRotationDisabled(true)}
                    onPointerUp={() => setRotationDisabled(false)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={() => setRotationDisabled(false)}
                />
            )}
        </div>
    );
};

export default Product360Viewer;
