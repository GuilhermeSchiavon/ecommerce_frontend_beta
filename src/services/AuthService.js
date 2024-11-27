import Api from './Api'

export default {
    login(credentials) {
        return Api().post('users/login', credentials);
    },
    getUser(){
        return Api().get('users/profile');
    },
    create(credentials){
        return Api().post('users/signup', credentials);
    },
    createAgain(credentials){
        return Api().post('users/newToken', credentials);
    },
    update(credentials){
        return Api().put('users/update', credentials);
    },
    confirmUser(credentials){
        return Api().get(`users/confirmAcount/${credentials}`,);
    },
    newPassVerifyEmail(email){
        return Api().post(`users/newPassword/verify-email`, email );
    },
    newPassVerifyToken(token){
        return Api().post(`users/newPassword/verify-token`, token);
    },
    newPass(credentials){
        return Api().post(`users/newPassword`, credentials );
    }
}