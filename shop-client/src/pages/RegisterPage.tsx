import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link, redirect } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(name, email, password, confirmPassword);
    };
    return (
        <section>
            <div className='mt-5'>
                <h1 className='text-2xl font-bold'>Register</h1>
                <form onSubmit={submitHandler}>
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
                    <Button>Registrieren</Button>
                </form>

                <div className='py-3'>
                    Ich besitze schon einen Account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
