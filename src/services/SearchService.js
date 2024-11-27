import Api from './Api'

export default {
    get(keyword, pageNumber, sort) {
        return Api().get(`lowercase_singular?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}`);
    },
    getOne(id) {
        return Api().get(`lowercase_singular/${id}`);
    },
    create(data) {
        return Api().post(`lowercase_singular`, data);
    },
    update(data) {
        return Api().put(`lowercase_singular/${data.id}`, data);
    }
}