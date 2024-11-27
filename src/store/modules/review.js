import ReviewService from '../../services/ReviewService'

const state = () => ({
    reviews: null,
    loading: false
})
  
const actions = {
    async addReview({commit, rootState}, comment){
        try {
            const response = await ReviewService.post(comment.id, { comment: comment.comment, rating: comment.rating });
            response.data.user = {
                "firstName": rootState.user.user.firstName,
                "lastName": rootState.user.user.lastName
            }
            rootState.product.product.Reviews.push(response.data)
            rootState.product.product.num_reviews++
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async deleteReview({commit, rootState}, payload){
        try {
            await ReviewService.delete(payload.productID, payload.reviewID);
            const reviewIndex = rootState.product.product.Reviews.findIndex(review => review.id === payload.reviewID);
            if (reviewIndex !== -1) {
                rootState.product.product.Reviews.splice(reviewIndex, 1);
                rootState.product.product.num_reviews--
            }
            commit('SET_ALERT', {
                heading: 'success',
                message: 'Review deletado!'
            });
        } catch (error) {
            commit('LOG_USER_OUT');
            ccommit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
}

const getters = {
    getReviews: state => state.reviews,
}

export default {
    state,
    getters,
    actions
};