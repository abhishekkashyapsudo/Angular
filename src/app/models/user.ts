export class User {
    public name: string;
    public email: string;
    public phoneNumber: string;
    public username: string;
    public password: string;
    public address: string;
    public pin: string;

    public User(username:string, pwd: string, name: string, email: string){
        this.email = email;
        this.password = pwd;
        this.username = username;
        this.name = name;
    }
}
