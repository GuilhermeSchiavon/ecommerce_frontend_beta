import Api from './Api'

export default {
    get(keyword, pageNumber, category, tag, sort) {
        return Api().get(`product?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&tag=${tag}&sortBy=${sort}`);
    },
    getOne(id) {
        return Api().get(`product/${id}`);
    },
    getTop() {
        return Api().get(`product/top`);
    }
}