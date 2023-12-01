import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
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
    // const navigate = useNavigate();

    const registerHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            throw new Error('Passwörter stimmen nicht überein');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                // navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section>
            <div className='mt-5'>
                <h1 className='text-2xl font-bold'>Register</h1>
                <form onSubmit={registerHandler}>
                    <div className='flex flex-column gap-2'>
                        <label className='text-s' htmlFor='name'>
                            Name
                        </label>
                        <InputText
                            id='name'
                            aria-describedby='name-help'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Namen eingeben'
                        />
                        <small id='name-help'>Gib deinen Namen ein.</small>
                    </div>
                    <div className='flex flex-column gap-2'>
                        <label htmlFor='email'>Email</label>
                        <InputText id='email' aria-describedby='email-help' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <small id='email-help'>Gib eine gültige Email ein.</small>
                    </div>
                    <div className='flex flex-column gap-2'>
                        <label htmlFor='password'>Passwort</label>
                        <Password id='password' value={password} feedback={false} onChange={(e) => setPassword(e.target.value)} toggleMask />
                    </div>
                    <div className='flex flex-column gap-2'>
                        <label htmlFor='confirmPassword'>Passwort wiederholen</label>
                        <Password
                            id='confirmPassword'
                            value={confirmPassword}
                            feedback={false}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            toggleMask
                        />
                    </div>
                    <Button disabled={isLoading}>Registrieren</Button>
                </form>

                <div className='py-3'>
                    Ich besitze schon einen Account?
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
