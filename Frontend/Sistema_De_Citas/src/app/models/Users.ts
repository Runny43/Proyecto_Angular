export class Users {
    id!: number;
    email!: string;
    password!: string;
    user_name!: string;
    user_role!: string;

    constructor(
        id: number,
        email: string,
        password: string,
        user_name: string,
        user_role: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.user_name = user_name;
        this.user_role = user_role;
    }
}