import Api from './Api'

export default {
    get(CuponCode) {
        return Api().get(`cupom/${CuponCode}`);
    },
}