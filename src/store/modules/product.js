import VariationsComponentVue from '@/components/product/VariationsComponent.vue';
import ProductService from '../../services/ProductService'

const state = () => ({
    product: null,
    product_variation: null,
    topProducts: [],
    pages: 0,
    page: 1,
    products: [],
    relatedProduct: [],
    showVerificarTamanho: false,
    cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    liked: localStorage.getItem('likedItems') ? JSON.parse(localStorage.getItem('likedItems')) : [],
    productLoading: false,
    loadingMoreProducts: false,
    alertsProduct: null
})
  
const mutations = {
    SET_PRODUCTS: (state, payload) => {
        state.products = payload.products;
        state.pages = payload.pages;
        state.page = payload.pageNumber;
    },
    SET_MORE_PRODUCTS: (state, payload) => {
        state.products = [...state.products, ...payload.products];
        state.pages = payload.pages;
        state.page = payload.pageNumber;
    },
    SET_PRODUCT: (state, product) => {
        state.product = product
    },
    SET_PRODUCT_VARIATION: (state, variation) => {
        if(variation.quantity <= 0) return
        state.product_variation = variation
    },
    ADD_TO_CART: (state, { newProduct, hasActiveVariation }) => {
        if (newProduct.qty <= 0) newProduct.qty = 1;
        if(hasActiveVariation){
            var existingProduct = state.cart.find(product => product.id === newProduct.id && product.variationSelected.id === newProduct.variationSelected.id);
            var availableQuantity = newProduct.variationSelected.quantity;
            if(existingProduct !== undefined) newProduct.variationSelected.quantity - existingProduct.qty;
        }else{
            var existingProduct = state.cart.find(product => product.id === newProduct.id);
            var availableQuantity = newProduct.quantity;
            if(existingProduct !== undefined) availableQuantity = newProduct.quantity - existingProduct.qty;
        }
        let updatedCart = state.cart
        if (!existingProduct) {
            // state.cart = [...state.cart, newProduct];
            updatedCart = [...state.cart, newProduct];
        } else {
             const totalQuantity = existingProduct.qty + newProduct.qty;
             if (totalQuantity > availableQuantity) {
                 if (availableQuantity > 0) {
                     existingProduct.qty = availableQuantity;
                     state.alertsProduct = { heading: 'error', message: 'A quantidade excede o estoque máximo.'};
                    } else {
                        state.alertsProduct = { heading: 'error', message: 'O produto já está no carrinho com a quantidade máxima.'};
                 }
             } else {
                 existingProduct.qty += newProduct.qty;
             }
        }
      
        updatedCart.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      
        state.cart = updatedCart;
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    },      
    ADD_TO_LIKED: (state, newProduct) => {
        const newArray = state.liked.filter(product => product.id !== newProduct.id);
        state.liked = [newProduct, ...newArray]
        localStorage.setItem('likedItems', JSON.stringify([newProduct, ...newArray]));
    },
    DECREASE_QUANTITY: (state, SelectProduct) => {
        let updatedCart = state.cart;
        let hasActiveVariation = false;

        hasActiveVariation = SelectProduct.ProductCharVariations.some(
            (variation) => variation.status === 'ativo'
        );
        if(hasActiveVariation){
            var existingProduct = state.cart.find(product => product.variationSelected.id === SelectProduct.variationSelected.id);
        }else{
            var existingProduct = state.cart.find(product => product.id === SelectProduct.id);
        }

        if (existingProduct) {
          if (existingProduct.qty > 1) {
            existingProduct.qty--;
          } else { // Caso a quantidade seja 1, remove o produto do carrinho
            if(hasActiveVariation){
                updatedCart = state.cart.filter(product => product.variationSelected.id !== SelectProduct.variationSelected.id);
            }else{
                updatedCart = state.cart.filter(product => product.id !== SelectProduct.id);
            }
          }
        }
        state.cart = updatedCart;
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    },
    REMOVE_FROM_CART: (state, SelectProduct) => {
        let hasActiveVariation = false;

        hasActiveVariation = SelectProduct.ProductCharVariations.some(
            (variation) => variation.status === 'ativo'
        );
        if(hasActiveVariation){
            var newArray = state.cart.filter(product => !product.variationSelected || product.variationSelected.id != SelectProduct.variationSelected.id );
        }else{
            var newArray = state.cart.filter(product => product.id !== SelectProduct.id);
        }
        state.cart = newArray;
        localStorage.setItem('cartItems', JSON.stringify(newArray));
    },
    CLEAN_CART: (state) => {
        state.cart = [];
        localStorage.removeItem('cartItems');
    },
    REMOVE_FROM_LIKED: (state, SelectProduct) => {
        const newArray = state.liked.filter(product => product.id !== SelectProduct.id);
        state.liked = newArray;
        localStorage.setItem('likedItems', JSON.stringify(newArray));
    },
    SET_SELECTED: (state) => {
        state.product = null;
        state.product_variation = null;
    },
    SET_PRODUCT_LOADING: (state, payload) => {
        state.productLoading = payload;
    },
    SET_MORE_PRODUCT_LOADING: (state, payload) => {
        state.loadingMoreProducts = payload;
    },
    SET_RELATED_PRODUCTS(state){
        state.relatedProduct = state.products;
    },
    REMOVE_COMMENT(state, product){
        state.product = product;
    },
    SET_TOP_PRODUCTS(state, payload){
        state.topProducts = payload;
    },
    SHOW_MODAL_VERIFICAR_TAMANHO: (state, boolean) => {
        state.showVerificarTamanho = boolean
    }
}

const actions = {
    async fetchProduct({commit}, id){
        try {
            commit('SET_PRODUCT_LOADING', true);
            const response = await ProductService.getOne(id);
            commit('SET_PRODUCT', response.data)
            commit('SET_PRODUCT_LOADING', false);
        } catch (error) {}
    },
    async fetchProducts({commit}, { keyword = '', pageNumber = 1, category = null, tag = null, sortBy = 'mais recentes'}){
        try {
            commit('SET_PRODUCT_LOADING', true);
            const response = await ProductService.get(keyword, pageNumber, category, tag, sortBy);
            commit('SET_PRODUCTS', {...response.data, products: response.data.products});
            commit('SET_PRODUCT_LOADING', false);
        } catch (error) {
            commit('SET_MORE_PRODUCT_LOADING', false);
        }
    },
    async fetchMoreProducts({commit}, { keyword = '', pageNumber = 1, sortBy = 'mais recentes'}){
        try {
            commit('SET_MORE_PRODUCT_LOADING', true);
            const response = await ProductService.get(keyword, pageNumber, sortBy);
            commit('SET_MORE_PRODUCTS', {...response.data, products: response.data.products});
            commit('SET_MORE_PRODUCT_LOADING', false);
        } catch (error) {
            commit('SET_MORE_PRODUCT_LOADING', false);
        }
    },
    async fetchTopProducts({commit}){
        try {
            const response = await ProductService.getTop();
            commit('SET_TOP_PRODUCTS', response.data);
        } catch (error) {}
    },
    async addToCard({state, commit, rootState}, newProduct){
        try {
            let hasActiveVariation = false;
            if(newProduct.ProductCharVariations.length){
                hasActiveVariation = newProduct.ProductCharVariations.some(
                    (variation) => variation.status === 'ativo'
                );
            }
            if(hasActiveVariation){
                const variationSelected = state.product_variation;
                if (variationSelected == null || !newProduct.ProductCharVariations.some((variation) => variation.id === variationSelected.id) )
                    commit('SET_ALERT', { heading: 'error', message: 'Selecione o campo de ' + newProduct.ProductCharVariations[0].Characteristic.name });
                if (newProduct.qty > variationSelected.quantity) {
                    commit('SET_ALERT', { heading: 'error', message: 'A quantidade excede o estoque máximo'});
                } else {
                    newProduct.shippingMethod = rootState.shipping.shippingSelect;
                    newProduct.variationSelected = variationSelected;
                    await commit('ADD_TO_CART', {newProduct, hasActiveVariation});
                    commit('SHOW_CART_ANIMATION');
                }
            }else {
                if (newProduct.qty > newProduct.quantity) {
                    commit('SET_ALERT', { heading: 'error', message: 'A quantidade excede o estoque máximo'});
                } else {
                    newProduct.shippingMethod = rootState.shipping.shippingSelect;
                    await commit('ADD_TO_CART', {newProduct, hasActiveVariation});
                    commit('SHOW_CART_ANIMATION');
                }
            }

            if(state.alertsProduct) {
                commit('SET_ALERT', state.alertsProduct);
                state.alertsProduct = null
            }
        } catch (error) {}
    },
    async setQtyItemToCard({state, commit}, newProduct){
        try {
            let hasActiveVariation = false;
            if(newProduct.ProductCharVariations.length){
                hasActiveVariation = newProduct.ProductCharVariations.some(
                    (variation) => variation.status === 'ativo'
                );
            }
            if(hasActiveVariation){
                await commit('ADD_TO_CART', {newProduct, hasActiveVariation});
                commit('SHOW_CART_ANIMATION');
            }else {
                if (newProduct.qty > newProduct.quantity) {
                    commit('SET_ALERT', { heading: 'error', message: 'A quantidade excede o estoque máximo'});
                }else {
                    await commit('ADD_TO_CART', {newProduct, hasActiveVariation});
                    commit('SHOW_CART_ANIMATION');
                }
            }

            if(state.alertsProduct) {
                commit('SET_ALERT', state.alertsProduct);
                state.alertsProduct = null
            }
        } catch (error) {}
    }
}

const getters = {
    getProducts: state => state.products,
    getProduct: state => state.product,
    getProductVariation: state => state.product_variation,
    getCart: state => state.cart,
    getLiked: state => state.liked,
    getProductLoading: state => state.productLoading,
    getMoreProductLoading: state => state.loadingMoreProducts,
    getRelatedProduct: state => state.relatedProduct,
    getTopProducts: state => state.topProducts,
    getShowModalVerificarTamanho: state => state.showVerificarTamanho,
}

export default {
    state,
    getters,
    mutations,
    actions
};