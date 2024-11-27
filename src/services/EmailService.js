import Api from './Api'

export default {
    send(mailOptions) {
        return Api().post(`/send/`, mailOptions);
    },
    sendResetPassword(mailOptions, HTML, userInput) {
        return Api().post(`/send/resetPassword`, {mailOptions, HTML, userInput});
    }
}