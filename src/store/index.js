import Vue from 'vue'
import Vuex from 'vuex'
import helpers from './modules/helpers';
import user from './modules/user';
import product from './modules/product';
import review from './modules/review';
import address from './modules/address';
import shipping from './modules/shipping';
import password from './modules/password';
import email from './modules/email';
import search from './modules/search';
import category from './modules/category';
import tag from './modules/tag';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        helpers,
        user,
        product,
        review,
        address,
        email,
        shipping,
        password,
        email,
        search,
        category,
        tag
    }
})
