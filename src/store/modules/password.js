import PasswordService from '../../services/PasswordService'

const state = () => ({
    password_slep: 1,
    loadingPassword: false,
})
  
const mutations = {
    SLIP_NEW_PASSWORD: (state, slep) => {
        state.password_slep = slep;
    },
    SET_LOADING_PASSWORD: (state, payload) => {
        state.loadingPassword = payload
    },
}

const actions = {
    async newPessVerificarEmail({commit, dispatch}, userInput){
        try {
            commit('SET_LOADING_PASSWORD', true)
            await PasswordService.newPassVerifyEmail(userInput);
            const response = await dispatch('sendNewPassword', userInput, { root: true });
            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('SLIP_NEW_PASSWORD', 2)
            commit('SET_LOADING_PASSWORD', false)
            return response.data.email
        } catch (error) {
            commit('SLIP_NEW_PASSWORD', 1)
            commit('SET_LOADING_PASSWORD', false)
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async newPessVerificarToken({commit}, token){
        try {
            commit('SET_LOADING_PASSWORD', true)
            const response = await PasswordService.newPassVerifyToken(token);
            if(response.data.valido == true){
                commit('SLIP_NEW_PASSWORD', 3)
            }
            commit('SET_LOADING_PASSWORD', false)
        } catch (error) {
            commit('SET_LOADING_PASSWORD', false)
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async submitNewPass({commit}, credentials){
        try {
            commit('SET_LOADING_PASSWORD', true)
            const response = await PasswordService.newPass(credentials);

            if(response.data.user){
                commit('SET_ALERT', {
                    heading: 'success',
                    message: response.data.message
                });
                setTimeout(() => {
                    commit('REDIRECT', '/');
                    commit('SET_USER', response.data);
                    commit('SLIP_NEW_PASSWORD', 1)
                }, 3000);
            }
            commit('SET_LOADING_PASSWORD', false)
        } catch (error) {
            commit('SET_LOADING_PASSWORD', false)
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    }
}

const getters = {
    getLoadingPassword: state => state.loadingPassword,
    getPasswordSlep: state => state.password_slep,
}

export default {
    state,
    getters,
    mutations,
    actions
};