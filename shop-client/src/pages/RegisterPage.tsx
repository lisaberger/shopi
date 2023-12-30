import { FormEvent, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '@/store/slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            throw new Error('Passwörter stimmen nicht überein');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section style={{ backgroundImage: 'linear-gradient(to right top, #263238, #2d3b42, #34454c, #3c4e56, #435861)' }}>
            <div className='m-auto w-25rem pt-5 px-4 text-white'>
                <h1 className='text-2xl font-semibold'>Register</h1>
                <form onSubmit={registerHandler}>
                    <div className='mt-2 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='name'>
                            Name
                        </label>
                        <InputText
                            id='name'
                            aria-describedby='name-help'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Namen eingeben'
                        />
                    </div>
                    <div className='mt-4 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='email'>
                            Email
                        </label>
                        <InputText
                            placeholder='Email eingeben'
                            id='email'
                            aria-describedby='email-help'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mt-4 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='password'>
                            Passwort
                        </label>
                        <div>
                            <Password
                                placeholder='Passwort eingeben'
                                id='password'
                                value={password}
                                feedback={false}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                            />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='confirmPassword'>
                            Passwort wiederholen
                        </label>
                        <div>
                            <Password
                                placeholder='Passwort eingeben'
                                id='confirmPassword'
                                value={confirmPassword}
                                feedback={false}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                toggleMask
                            />
                        </div>
                    </div>
                    <Button className='mt-6' disabled={isLoading}>
                        Registrieren
                    </Button>
                </form>

                <div className='py-3'>
                    Ich besitze schon einen Account?{' '}
                    <Link to='/login' className='underline'>
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
