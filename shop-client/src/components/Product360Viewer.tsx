import { useState } from 'react';
import { ReactImageTurntable } from 'react-image-turntable';

const Product360Viewer = ({ images }) => {
    const [rotationDisabled, setRotationDisabled] = useState(false);

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (rotationDisabled) return;

        if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
            setRotationDisabled(true);
        }
    };
    return (
        <ReactImageTurntable
            images={images}
            autoRotate={{ disabled: true }}
            onPointerDown={() => setRotationDisabled(true)}
            onPointerUp={() => setRotationDisabled(false)}
            onKeyDown={handleKeyDown}
            onKeyUp={() => setRotationDisabled(false)}
        />
    );
};

export default Product360Viewer;
