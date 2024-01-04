interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

interface IUserInfo {
    name: string;
    email: string;
}

interface IUserLogin {
    email: string;
    password: string;
}

export type { IUser, IUserInfo, IUserLogin };
