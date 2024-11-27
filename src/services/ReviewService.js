import Api from './Api'

export default {
    post(id, comment) {
        return Api().post(`/reviews/add/${id}`, comment);
    },
    delete(productID, reviewID){
        return Api().delete(`/reviews/del/${productID}/reviews/${reviewID}`);
    }
}