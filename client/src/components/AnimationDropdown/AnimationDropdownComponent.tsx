import { Button } from 'primereact/button';

const AnimationDropdownComponent = ({ animationOptions, onAnimationChange, onToggleAnimation, animationIsRunning }) => {
    const animationIcon = animationIsRunning ? 'pi pi-pause' : 'pi pi-play';

    const handleAnimationChange = (event) => {
        onAnimationChange(event);
    };

    const handleAnimation = (event) => {
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
