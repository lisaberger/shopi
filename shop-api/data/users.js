import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('changeit', 10),
        isAdmin: true,
    },
    {
        name: 'Lisa Berger',
        email: 'lisa.berger97@hs-augsburg.de',
        password: bcrypt.hashSync('lisa12345', 10),
        isAdmin: true,
    },
    {
        name: 'Test User',
        email: 'test@email.com',
        password: bcrypt.hashSync('changeit', 10),
        isAdmin: false,
    },
];

export default users;
