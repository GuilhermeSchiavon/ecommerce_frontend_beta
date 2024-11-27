import TagService from '../../services/TagService'

const state = () => ({
    loadingTags: false,
    tags: [],
    tagsSuggestions: (() => {
        try {
            return {
                timestamp: localStorage.getItem('tagsSuggestions') ? JSON.parse(localStorage.getItem('tagsSuggestions')).timestamp : null,
                data: localStorage.getItem('tagsSuggestions') ? JSON.parse(localStorage.getItem('tagsSuggestions')).data : [],
            }
        } catch (error) {
            localStorage.removeItem('tagsSuggestions');
            return [];
        }
    })(),
    total: 0,
    pages: 0,
    page: 1,
})
  
const mutations = {
    SET_TAGS: (state, payload) => {
        if(payload.pageNumber == 1) {
            state.tags = payload.itens
        }else{
            state.tags = [...state.tags, ...payload.itens]
        }
        state.page =  payload.pageNumber
        state.pages =  payload.pages
        state.total =  payload.total
    },
    SET_TAGS_SUGGESTIONS: (state, payload) => {
        state.tagsSuggestions.data = payload.itens;
        state.tagsSuggestions.timestamp = new Date().getTime() + (1 * 24 * 60 * 60 * 1000); // (24 horas * 60 minutos * 60 segundos * 1000 milissegundos) ao timestamp

        localStorage.setItem('tagsSuggestions', JSON.stringify(state.tagsSuggestions));
    },
    SET_LOADING_TAGS: (state, payload) => {
        state.loadingTags = payload
    },
}

const actions = {
    async fetchTags({commit}, { keyword = '', pageNumber = 1, sortBy = { name: 'ID', column: 'ID', sort: 'ASC' }}){
        try{
            commit('SET_LOADING_TAGS', true)
            const response = await TagService.get(keyword, pageNumber, sortBy);
            commit('SET_TAGS', response.data)
            commit('SET_LOADING_TAGS', false)
        } catch (error) {
            commit('SET_LOADING_TAGS', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchTagsSuggestions({commit}, limit = 4){
        try{
            commit('SET_LOADING_TAGS', true)
            const response = await TagService.getSuggestions(limit);
            commit('SET_TAGS_SUGGESTIONS', response.data)
            commit('SET_LOADING_TAGS', false)
        } catch (error) {
            commit('SET_LOADING_TAGS', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
}

const getters = {
    getTags: state => state.tags,
    getTagsSuggestions: state => {
        const isExpired = state.tagsSuggestions.timestamp && state.tagsSuggestions.timestamp < new Date().getTime();
        return isExpired || !state.tagsSuggestions.data ? [] : state.tagsSuggestions.data;
    },
    getLoadingTags: state => state.loadingTags,
}

export default {
    state,
    getters,
    mutations,
    actions
};