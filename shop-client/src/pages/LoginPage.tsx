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
        <section>
            <div className='mt-5'>
                <form onSubmit={loginHandler}>
                    <h1 className='text-2xl'>Login</h1>
                    <div className='flex flex-column gap-2'>
                        <label htmlFor='email'>Email</label>
                        <InputText
                            id='email'
                            placeholder='Email eingeben'
                            aria-describedby='email-help'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-column gap-2'>
                        <label htmlFor='password'>Passwort</label>
                        <Password
                            id='password'
                            placeholder='Passwort eingeben'
                            value={password}
                            feedback={false}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                        />
                    </div>
                    <Button disabled={isLoading}>Login</Button>
                </form>

                <div className='py-3'>
                    Noch kein Profil? <Link to='/register'>Registrieren</Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
