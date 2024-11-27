import Api from './Api'

export default {
    get() {
        return Api().get(`user/address`);
    },
    create(Address){
        return Api().post('user/address/add', Address);
    },
    update(Address){
        return Api().put(`user/address/update`, Address);
    },
    delete(idAddress){
        return Api().delete(`user/address/delete/${idAddress}`);
    },
    getViaCep(zip){
        return Api().get(`https://viacep.com.br/ws/${zip}/json/`);
    }
}