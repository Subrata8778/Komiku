export class LoginModel {
    public userId: string;
    public password: string;
    public username: string;

    constructor(userId:string, password:string, username:string){
        this.userId = userId;
        this.password = password;
        this.username = username;
    }
}