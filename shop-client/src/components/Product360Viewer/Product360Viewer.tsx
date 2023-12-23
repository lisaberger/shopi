import { useState } from 'react';
import { ReactImageTurntable } from 'react-image-turntable';

interface Product360ViewerProps {
    images: string[];
}

const Product360Viewer: React.FC<Product360ViewerProps> = ({ images }) => {
    const [rotationDisabled, setRotationDisabled] = useState(false);

    // const images = useState<string[]>([]);

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (rotationDisabled) return;

        if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
            setRotationDisabled(true);
        }
    };

    return (
        <div className='w-9'>
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
