import Api from './Api'

export default {
    newPassVerifyEmail(userInput){
        return Api().post(`/password/verify-user`, userInput);
    },
    newPassVerifyToken(token){
        return Api().post(`/password/verify-token`, token);
    },
    newPass(credentials){
        return Api().post(`/password`, credentials );
    },
}