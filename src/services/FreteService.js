import Api from './Api'

export default {
    calculate(params){
        return Api().post(`/melhorenvio/shipment/calculate`, params);
    },
}