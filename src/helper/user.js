class User{
    constructor() {}

    getUserToken() {
        let userObj = JSON.parse(sessionStorage.getItem('user'));
        return (userObj) ? userObj['apiToken'] : '';
    }

    getUserId(){
        let userObj = JSON.parse(sessionStorage.getItem('user'));
        return (userObj) ? userObj['id'] : '';
    }
}

export default new User();