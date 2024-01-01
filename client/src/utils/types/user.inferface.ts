interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    image?: string;
}

interface UserInfo {
    name: string;
    email: string;
}

export type { User, UserInfo };
