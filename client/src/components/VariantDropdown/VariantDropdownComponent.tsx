import React from 'react';

const VariantDropdownComponent = ({ variantOptions, onVariantChange }) => {
    const handleVariantChange = (event) => {
        onVariantChange(event);
    };
    return (
        <div>
            <select id='variant' className='h-full p-2 border-round-sm border-primary text-color' onChange={handleVariantChange}>
                <option value='' disabled selected>
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
