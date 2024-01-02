/* eslint-disable @typescript-eslint/no-namespace */
import { useState } from 'react';
import '@google/model-viewer/dist/model-viewer';
import { Button } from 'primereact/button';
import { Annotation } from '@/utils/types/annotation.interface.ts';
import ModelViewerComponent from '@/components/ModelViewer/ModelViewerComponent';
import QRCodeOverlayComponent from '@/components/QrCodeOverlay/QrCodeOverlayComponent';

interface ProductARViewer {
    model: string;
    annotations: Annotation[];
    name: string;
}

const ProductARViewerContainer: React.FC<ProductARViewer> = ({ model, preview, annotations, name }) => {
    const [isActive, setIsActive] = useState(false);

    const handleOpenOverlay = () => {
        setIsActive(true);
    };

    const handleCloseOverlay = () => {
        setIsActive(false);
    };

    return (
        <>
            <article className='h-full relative surface-50 p-2'>
                <ModelViewerComponent annotations={annotations} preview={preview} model={model} name={name} />

                <Button
                    className='hidden md:block mx-auto'
                    severity='secondary'
                    rounded
                    text
                    label='In AR betrachten'
                    icon='pi pi-box'
                    onClick={handleOpenOverlay}
                />

                {isActive && <QRCodeOverlayComponent onClose={handleCloseOverlay} />}
            </article>
        </>
    );
};

export default ProductARViewerContainer;
