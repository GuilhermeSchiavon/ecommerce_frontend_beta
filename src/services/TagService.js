import Api from './Api'

export default {
    get(keyword, pageNumber, sort) {
        return Api().get(`tag?keyword=${keyword}&pageNumber=${pageNumber}&sortColumn=${sort.column}&sortOrder=${sort.order}`);
    },
    getSuggestions(limit) {
        return Api().get(`tag/suggestions?limit=${limit}`);
    },
}