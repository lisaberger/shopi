import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useAppSelector((state) => state.auth);

    const updateHandler = (event) => {
        event.preventDefault();
        console.log(name, email, password, confirmPassword);
    };

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    return (
        <section>
            <div className='mt-5'>
                <h1 className='text-2xl font-bold'>Profil</h1>
                <div className='grid gap-8'>
                    <div className='col-5'>
                        <h3>Profil anpassen</h3>
                        <form onSubmit={updateHandler}>
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
                                <InputText
                                    id='email'
                                    aria-describedby='email-help'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email eingeben'
                                />
                                <small id='email-help'>Gib eine gültige Email ein.</small>
                            </div>
                            <div className='flex flex-column gap-2'>
                                <label htmlFor='password'>Passwort</label>
                                <Password
                                    id='password'
                                    value={password}
                                    feedback={false}
                                    onChange={(e) => setPassword(e.target.value)}
                                    toggleMask
                                    placeholder='Passwort eingeben'
                                />
                            </div>
                            <div className='flex flex-column gap-2'>
                                <label htmlFor='confirmPassword'>Passwort wiederholen</label>
                                <Password
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    feedback={false}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    toggleMask
                                    placeholder='Passwort eingeben'
                                />
                            </div>
                            <Button>Profil anpassen</Button>
                        </form>
                    </div>

                    <div className='col-6'>
                        <h3>Meine Bestellungen</h3>
                        <div>
                            <DataTable tableStyle={{ minWidth: '50rem' }}>
                                <Column field='orderId' header='Bestellnummer'></Column>
                                <Column field='created' header='Datum'></Column>
                                <Column field='price' header='Preis'></Column>
                                <Column field='paid' header='Bezahlt'></Column>
                                <Column field='delivered' header='Geliefert'></Column>
                                <Column field='details'></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
