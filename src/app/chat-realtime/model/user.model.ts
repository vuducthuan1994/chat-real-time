export class User {
    name : string;
    avatar: string;
    status : string;
    constructor({ name : name , avatar : avatar , status : status}) {
        this.name = name? name : '';
        this.avatar = avatar ? avatar : '';
        this.status = status ? status : 'off';
    }
}