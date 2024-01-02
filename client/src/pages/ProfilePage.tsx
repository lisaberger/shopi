import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { useProfileMutation } from '@/store/slices/usersApiSlice';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    const updateHandler = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap();
            console.log('successful');
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            console.error(err?.data?.message || err.error);
        }
    };

    const [updateProfile] = useProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    return (
        <section className='p-4 md:px-8'>
            <div className='mt-4'>
                <h1 className='text-2xl mb-4 font-bold'>Profil</h1>
                <div className='grid'>
                    <div className='col-12 md:col-6'>
                        <h3 className='mb-4'>Profil anpassen</h3>
                        <form onSubmit={updateHandler}>
                            <div className='flex flex-column gap-2'>
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
                            <div className='mt-4 flex flex-column gap-2'>
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
                            <Button className='mt-4 text-color'>Profil aktualisieren</Button>
                        </form>
                    </div>

                    <div className='col-12 md:col-6'>
                        <h3 className='mb-4'>Meine Bestellungen</h3>
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
