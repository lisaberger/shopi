/* eslint-disable @typescript-eslint/no-namespace */
import { FC, useState } from 'react';
import '@google/model-viewer/dist/model-viewer';
import { Button } from 'primereact/button';
import { IAnnotation } from '@/utils/types/annotation.interface.ts';
import ModelViewer from '@/components/ModelViewer/ModelViewer.component';
import QRCodeOverlay from '@/components/QrCodeOverlay/QrCodeOverlay.component';

interface ProductARViewerProps {
    model: string;
    annotations: IAnnotation[];
    name: string;
    preview: string;
}

const ProductARViewer: FC<ProductARViewerProps> = ({ preview, model, annotations, name }) => {
    const [isActive, setIsActive] = useState(false);

    const handleOpenOverlay = () => {
        setIsActive(true);
    };

    const handleCloseOverlay = () => {
        setIsActive(false);
    };

    return (
        <>
            <article className='h-full relative p-2'>
                <ModelViewer preview={preview} annotations={annotations} model={model} name={name} />

                <Button
                    className='hidden md:block mx-auto'
                    severity='secondary'
                    rounded
                    text
                    label='In AR öffnen'
                    icon='pi pi-box'
                    onClick={handleOpenOverlay}
                />

                {isActive && <QRCodeOverlay onClose={handleCloseOverlay} />}
            </article>
        </>
    );
};

export default ProductARViewer;
