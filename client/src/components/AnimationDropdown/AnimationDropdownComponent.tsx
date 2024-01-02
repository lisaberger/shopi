import { Button } from 'primereact/button';
import { ChangeEvent, MouseEvent } from 'react';

interface AnimationDropdownComponent {
    animationOptions: string[];
    onAnimationChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onToggleAnimation: (event: MouseEvent<HTMLButtonElement>) => void;
    animationIsRunning: boolean;
}

const AnimationDropdownComponent: React.FC<AnimationDropdownComponent> = ({
    animationOptions,
    onAnimationChange,
    onToggleAnimation,
    animationIsRunning,
}) => {
    const animationIcon = animationIsRunning ? 'pi pi-pause' : 'pi pi-play';

    const handleAnimationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onAnimationChange(event);
    };

    const handleAnimation = (event: MouseEvent<HTMLButtonElement>) => {
        onToggleAnimation(event);
    };

    return (
        <div>
            <span className='mr-1'>
                <select id='animation' className='h-full p-2 border-round-sm border-primary text-color' onChange={handleAnimationChange}>
                    <option value='' disabled selected>
                        Animationen
                    </option>
                    {animationOptions.map((animation, index) => (
                        <option key={index} value={animation}>
                            {animation}
                        </option>
                    ))}
                </select>
            </span>
            <Button icon={animationIcon} onClick={handleAnimation} />
        </div>
    );
};

export default AnimationDropdownComponent;
