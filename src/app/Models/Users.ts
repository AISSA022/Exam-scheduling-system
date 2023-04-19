export class Usersmodel {
    id!: number;
    firstName = String;
    lastName = String;
    email = String;
    gender = String;
    phoneNumber!: number;
    birthday!: Date;
    password!: string;
    token!: string;
    status!: boolean;
    loggedIn!: boolean;
    roleId!: number;
    refreshToken!: string;
    refreshTokenTime!: Date;
    resetPasswordToken!: string;
    resetPasswordExpiry!: Date

}