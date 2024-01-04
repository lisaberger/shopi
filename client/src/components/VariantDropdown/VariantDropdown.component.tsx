import { ChangeEvent, FC } from 'react';

interface VariantDropdownProps {
    variantOptions: string[];
    onVariantChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const VariantDropdownComponent: FC<VariantDropdownProps> = ({ variantOptions, onVariantChange }) => {
    const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onVariantChange(event);
    };
    return (
        <div>
            <select id='variant' className='h-full p-2 border-round-sm border-primary text-color' onChange={handleVariantChange}>
                <option value='default' disabled>
                    Varianten
                </option>
                {variantOptions.map((variant, index) => (
                    <option key={index} value={variant}>
                        {variant}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default VariantDropdownComponent;
