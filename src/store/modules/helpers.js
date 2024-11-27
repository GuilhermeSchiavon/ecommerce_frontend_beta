const state = () => ({
    isMenuOpen: false,
    authenticateBeforeCheckout: true,
    hideScrollBar: false,
    alerts: [],
    currency: 'R$',
    storeName: process.env.VUE_APP_TITLE,
    showCartAnimation: false,
})
  
const mutations = {
    TOGGLE_MENU(state, payload) {
        state.hideScrollBar = payload
        state.isMenuOpen = payload
    },
    SET_ALERT(state, alert){
        if(alert && alert.message != "Sessão expirada") {
            state.alerts.unshift(alert);
            setTimeout(() => {
                state.alerts.pop();
            }, 5000);
        }
    },
    SHOW_CART_ANIMATION(state) {
        state.showCartAnimation = true;
        setTimeout(() => {
            state.showCartAnimation = false;
        }, 950);
    },
}

const getters = {
    getIsMenuOpen: state => state.isMenuOpen,
    getAlerts: state => state.alerts,
    getShowCartAnimation: state => state.showCartAnimation,
}

export default {
    state,
    getters,
    mutations
};