import Api from './Api'

export default {
    get(keyword, pageNumber, sort) {
        return Api().get(`category?keyword=${keyword}&pageNumber=${pageNumber}&sortColumn=${sort.column}&sortOrder=${sort.order}`);
    },
    getSuggestions(limit) {
        return Api().get(`category/suggestions?limit=${limit}`);
    },
}