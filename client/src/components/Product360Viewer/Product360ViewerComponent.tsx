import { useState } from 'react';
import { ReactImageTurntable } from 'react-image-turntable';

interface Product360Viewer {
    images: string[];
}

const Product360Viewer: React.FC<Product360Viewer> = ({ images }) => {
    const [rotationDisabled, setRotationDisabled] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (rotationDisabled) return;

        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            setRotationDisabled(true);
        }
    };

    return (
        <div className='w-9 cursor-move'>
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
