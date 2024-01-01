import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useLoginMutation } from '@/store/slices/usersApiSlice';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const loginHandler = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section style={{ backgroundImage: 'linear-gradient(to right top, #263238, #2d3b42, #34454c, #3c4e56, #435861)' }}>
            <div className='m-auto w-25rem pt-5 px-4 text-white'>
                <form onSubmit={loginHandler}>
                    <h1 className='font-semibold text-2xl'>Login</h1>
                    <div className='mt-4 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='email'>
                            Email
                        </label>
                        <InputText
                            id='email'
                            placeholder='Email eingeben'
                            aria-describedby='email-help'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mt-4 flex flex-column gap-2'>
                        <label className='text-xs' htmlFor='password'>
                            Passwort
                        </label>
                        <div className='w-full'>
                            <Password
                                id='password'
                                placeholder='Passwort eingeben'
                                value={password}
                                feedback={false}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                            />
                        </div>
                    </div>
                    <Button className='mt-6' disabled={isLoading}>
                        Login
                    </Button>
                </form>

                <div className='py-3'>
                    Noch kein Profil?{' '}
                    <Link to='/register' className='underline'>
                        Registrieren
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
