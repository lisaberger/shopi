import { Button } from 'primereact/button';
import { FC } from 'react';
import QRCode from 'react-qr-code';

interface QRCodeOverlayProps {
    onClose: () => void;
}

const QRCodeOverlay: FC<QRCodeOverlayProps> = ({ onClose }) => {
    const qrValue = window.location.href;

    return (
        <div className='bg-black-alpha-90 absolute top-0 text-sm w-full p-4 pb-8'>
            <div className='mb-4 '>
                <Button size='small' label='schließen' rounded text icon='pi pi-times' onClick={() => onClose()} />
            </div>
            <div className='flex flex-column align-items-center text-white gap-4 text-center'>
                <div>
                    <h3>Augmented Reality ist nur auf Smartphones und Tablets möglich!</h3>
                    <p className='text-xs text-500'>Unterstützte Geräte: iPhone 6S+ & iPad 5+ on iOS 12+ und Android 8.0+ mit ARCore 1.9 support</p>
                </div>
                <div className='qr-code flex-shrink-0 bg-white p-2 h-auto max-w-12rem'>
                    <QRCode className='w-full h-auto max-w-full' size={256} value={qrValue} viewBox={`0 0 256 256`} />
                </div>
                <div>
                    <h3>Über QR-Code öffnen:</h3>
                    <p className='text-xs text-500'>Scanne den QR-Code, um das Produkt auf deinem Gerät zu öffnen. Klicke dann auf den AR-Button</p>
                </div>
            </div>
        </div>
    );
};

export default QRCodeOverlay;
