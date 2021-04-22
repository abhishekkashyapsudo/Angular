export class User {
    public name: string;
    public email: string;
    public phoneNumber: string;
    public username: string;
    public password: string;
    public address: string;
    public pin: string;

    constructor(username:string, pwd: string, name: string, email: string , phone: string, address: string, pin: string){
        this.email = email;
        this.password = pwd;
        this.username = username;
        this.name = name;
        this.phoneNumber = phone;
        this.pin = pin;
        this.address = address;
    }
}
