import SearchService from '../../services/SearchService'

const state = () => ({
    loadingResearches: false,
    search: null,
    researches: [],
    total: 0,
    pages: 0,
    page: 1,
    show_modal_search: false
})
  
const mutations = {
    SET_SEARCH: (state, payload) => {
        state.search = payload
    },
    SET_RESEARCHES: (state, payload) => {
        if(payload.pageNumber == 1) {
            state.researches = payload.itens
        }else{
            state.researches = [...state.researches, ...payload.itens]
        }
        state.page =  payload.pageNumber
        state.pages =  payload.pages
        state.total =  payload.total

    },
    SET_LOADING_RESEARCHES: (state, payload) => {
        state.loadingSearch = payload
    },
    SET_SHOW_MODAL_SEARCH: (state, payload) => {
        state.show_modal_search = payload
    },
}

const actions = {
    async fetchSearch({commit}, id){
        try{
            commit('SET_LOADING_RESEARCHES', true)
            const response = await SearchService.getOne(id);
            commit('SET_SEARCH', response.data)
            commit('SET_LOADING_RESEARCHES', false)
        } catch (error) {
            commit('SET_LOADING_RESEARCHES', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchResearches({commit}, { keyword = '', pageNumber = 1, sortBy = 'mais recentes' }){
        try{
            commit('SET_LOADING_RESEARCHES', true)
            const response = await SearchService.get(keyword, pageNumber, sortBy);
            commit('SET_RESEARCHES', response.data)
            commit('SET_LOADING_RESEARCHES', false)
        } catch (error) {
            commit('SET_LOADING_RESEARCHES', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async createSearch({commit}, data){
        try{
            commit('SET_LOADING_RESEARCHES', true)
            const response = await SearchService.create(data);
            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('SET_SHOW_MODAL_SEARCH', false)
            commit('SET_LOADING_RESEARCHES', false)
        } catch (error) {
            commit('SET_LOADING_RESEARCHES', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async updadeSearch({commit}, data){
        try{
            commit('SET_LOADING_RESEARCHES', true)
            const response = await SearchService.update(data);
            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('SET_LOADING_RESEARCHES', false)
        } catch (error) {
            commit('SET_LOADING_RESEARCHES', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
}

const getters = {
    getSearch: state => state.search,
    getResearches: state => state.researches,
    getLoadingSearch: state => state.loadingSearch,
    getShowModalSearch: state => state.show_modal_search
}

export default {
    state,
    getters,
    mutations,
    actions
};