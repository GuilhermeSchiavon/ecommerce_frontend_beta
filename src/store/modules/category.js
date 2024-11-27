import CategoryService from '../../services/CategoryService'

const state = () => ({
    loadingCategory: false,
    categories: [],
    categoriesSuggestions: (() => {
        try {
            return {
                timestamp: localStorage.getItem('categoriesSuggestions') ? JSON.parse(localStorage.getItem('categoriesSuggestions')).timestamp : null,
                data: localStorage.getItem('categoriesSuggestions') ? JSON.parse(localStorage.getItem('categoriesSuggestions')).data : [],
            }
        } catch (error) {
            localStorage.removeItem('categoriesSuggestions');
            return [];
        }
    })(),
    total: 0,
    pages: 0,
    page: 1,
})
  
const mutations = {
    SET_CATEGORIES: (state, payload) => {
        if(payload.pageNumber == 1) {
            state.categories = payload.categories
        }else{
            state.categories = [...state.categories, ...payload.categories]
        }
        state.page =  payload.pageNumber
        state.pages =  payload.pages
        state.total =  payload.total
    },
    SET_CATEGORIES_SUGGESTIONS: (state, payload) => {
        state.categoriesSuggestions.data = payload.categories;
        state.categoriesSuggestions.timestamp = new Date().getTime() + (1 * 24 * 60 * 60 * 1000); // (24 horas * 60 minutos * 60 segundos * 1000 milissegundos) ao timestamp

        localStorage.setItem('categoriesSuggestions', JSON.stringify(state.categoriesSuggestions));
    },
    SET_LOADING_CATEGORIES: (state, payload) => {
        state.loadingCategory = payload
    },
}

const actions = {
    async fetchCategories({commit}, { keyword = '', pageNumber = 1, sortBy = { name: 'ID', column: 'ID', sort: 'ASC' } }){
        try{
            commit('SET_LOADING_CATEGORIES', true)
            const response = await CategoryService.get(keyword, pageNumber, sortBy);
            commit('SET_CATEGORIES', response.data)
            commit('SET_LOADING_CATEGORIES', false)
        } catch (error) {
            commit('SET_LOADING_CATEGORIES', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchCategoriesSuggestions({commit}, limit = 8){
        try{
            commit('SET_LOADING_CATEGORIES', true)
            const response = await CategoryService.getSuggestions(limit);
            commit('SET_CATEGORIES_SUGGESTIONS', response.data)
            commit('SET_LOADING_CATEGORIES', false)
        } catch (error) {
            commit('SET_LOADING_CATEGORIES', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
}

const getters = {
    getCategories: state => state.categories,
    getCategoriesSuggestions: state => {
        const isExpired = state.categoriesSuggestions.timestamp && state.categoriesSuggestions.timestamp < new Date().getTime();
        return isExpired || !state.categoriesSuggestions.data ? [] : state.categoriesSuggestions.data;
    },
    getLoadingCategory: state => state.loadingCategory,
}

export default {
    state,
    getters,
    mutations,
    actions
};