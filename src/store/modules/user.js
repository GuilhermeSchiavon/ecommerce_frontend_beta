import AuthService from '../../services/AuthService'
import router from '../../router'

const state = () => ({
    user_confirmation: false,
    isAuthenticated: false,
    loadingUser: false,
    redirect: '/',
    token: localStorage.getItem('token') || null,
    user: (() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch (error) {
            localStorage.removeItem('user');
            return { firstName: ''};
        }
    })(),
})
  
const mutations = {
    REDIRECT: (state, payload) => {
        state.redirect = payload;
    },
    REGISTER_USER: (state) => {
        state.user_confirmation = true;
    },
    SET_USER: (state, payload) => {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('user', JSON.stringify(payload.user));
        state.isAuthenticated = true;
        state.user = payload.user
        state.token = payload.token
        if(router.currentRoute.path === '/auth' && !state.redirect){
            router.push({path: `/`});
        }else {
            router.push({path: state.redirect});
            state.redirect = null;
        }
        state.redirect = null;
    },
    AUTH_USER: (state, payload) => {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('user', JSON.stringify(payload.user));
        state.isAuthenticated = true;
        state.token = payload.token;
        state.user = payload.user;
    },
    SET_LOADING_USER: (state, payload) => {
        state.loadingUser = payload
    },
    LOG_USER_OUT(state){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('notifications');
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;

        if(router.currentRoute.path !== '/auth'){
            router.push({path: `/auth`});
        }
    },
}

const actions = {
    async loginUser({commit, dispatch}, credentials ){
        try {
            commit('SET_LOADING_USER', true);
            const response = await AuthService.login(credentials);
            if(response.data.user.accountStatus == 'pendente'){
                dispatch('sendNewAccount', response.data.user, { root: true })
                commit('REGISTER_USER'); 
                commit('SET_ALERT', {
                    heading: 'success',
                    message: response.data.message
                });
            } else if(response.data.user.accountStatus == 'ativa'){
                commit('SET_USER', response.data);
            }
            commit('SET_LOADING_USER', false);
        } catch (error) {
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async registerUser({commit, dispatch}, credentials){
        try{
            commit('SET_LOADING_USER', true);
            const response = await AuthService.create(credentials);
            dispatch('sendNewAccount', response.data.user, { root: true })
            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('REGISTER_USER'); 
            commit('SET_LOADING_USER', false);
        }catch(error){
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT')
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async registerUserAgain({commit, dispatch}, credentials){
        try{
            commit('SET_LOADING_USER', true);
            const response = await AuthService.createAgain(credentials);
            dispatch('sendNewAccount', response.data, { root: true })
            commit('SET_LOADING_USER', false);
        }catch(error){
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT')
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async confirmUser({commit}, credentials){
        try{
            commit('SET_LOADING_USER', true);
            const response = await AuthService.confirmUser(credentials.token);
            setTimeout(() => {
                if(response.data.user.accountStatus == 'ativa'){
                    commit('SET_ALERT', {
                        heading: 'success',
                        message: response.data.message
                    });
                    commit('REDIRECT', '/');
                    commit('SET_USER', response.data);
                }
            }, 4000);
            commit('SET_LOADING_USER', false);
        }catch(error){
            commit('SET_LOADING_USER', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async fetchUser({commit}){
        try{
            commit('SET_LOADING_USER', true)
            const response = await AuthService.getUser();
            commit('AUTH_USER', response.data)
            commit('SET_LOADING_USER', false)
        } catch (error) {
            commit('SET_LOADING_USER', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }

    },
    async updateUser({commit}, payload){
        try {
            commit('SET_LOADING_USER', true)
            const response = await AuthService.update(payload);
            commit('REDIRECT', '/profile/account');
            commit('SET_USER', response.data);
            commit('SET_LOADING_USER', false)
        } catch (error) {
            commit('SET_LOADING_USER', false)
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
}

const getters = {
    getUser: state => state.user,
    getLoadingUser: state => state.loadingUser,
    getConfirmation: state => state.user_confirmation,
}

export default {
    state,
    getters,
    mutations,
    actions
};