export type User = {
    id: string,
    name: string | null,
    email: string,
    username: string,
    profileImage: string | null,
    handle?: string;
};

export type UserData = {
    name: string,
    email: string,
    password: string,
    username: string,
    profileImage: string
};