import FreteService from '../../services/FreteService'

const state = () => ({
    CEP: (() => {
        try {
            return JSON.parse(localStorage.getItem('CEP')) || '';
        } catch (error) {
            localStorage.removeItem('CEP');
            return null;
        }
    })(),
    shippingSelect: null,
    shippingMethods: [],
    minSubtotalforShippingFree: null,
    minValueShippingFree: null,
    shippingFree: false,
    loadingShipping: false,
    showModalRastreio: false
})
  
const mutations = {
    SET_CEP: (state, cep) => {
        localStorage.setItem('CEP', JSON.stringify(cep));
        state.CEP = cep
    },
    SET_SHIPPING_SELECT: (state, data) => {
        state.shippingSelect = data
    },
    SET_SHIPPING_METHODS: (state, data) => {
        state.shippingMethods = data
    },
    SET_MIN_SUBTOTAL_FOR_SHIPPING_FREE: (state, value) => {
        state.minSubtotalforShippingFree = value.toFixed(2)
    },
    SET_MIN_VALUE_SHIPPING_FREE: (state, value) => {
        state.minValueShippingFree = value.toFixed(2)
    },
    SET_LOADING_SHIPPING: (state, boolean) => {
        state.loadingShipping = boolean
    },
    SHOW_MODAL_RASTREIO: (state, boolean) => {
        state.showModalRastreio = boolean
    },
}

const actions = {
    async obterCotacaoFrete({ commit }, dadosFrete) {
        try {
            commit('SET_LOADING_SHIPPING', true)
            const response = await FreteService.calculate(dadosFrete);
        
            let filteredData = response.data.filter(item => !item.error);

            const sortedData = filteredData.sort((a, b) => a.delivery_time - b.delivery_time);
              
            const deliveryMap = {};
            let minPrice = Infinity;
            let minPriceObject = null;

            sortedData.forEach(obj => {
                const key = `${obj.delivery_range.min}-${obj.delivery_range.max}`;
                if (!deliveryMap[key]) {
                    deliveryMap[key] = obj;
                }
                if (parseFloat(obj.price) < minPrice) {
                    minPrice = parseFloat(obj.price);
                    minPriceObject = obj;
                }
            });
    
            if (minPriceObject) {
                const minPriceKey = `${minPriceObject.delivery_range.min}-${minPriceObject.delivery_range.max}`;
                if (deliveryMap[minPriceKey]) {
                    deliveryMap[minPriceKey].isMinPrice = true;
                }
            }
            
            const uniqueData = Object.values(deliveryMap);
            commit('SET_SHIPPING_METHODS', uniqueData);
            commit('SET_LOADING_SHIPPING', false)
        } catch (error) {
            commit('SET_LOADING_SHIPPING', false)
          console.error('Erro ao buscar endereço:', error);
        }
      },
      async calculateShippingFree({ commit, rootState }, shippingPrice) {
        try{
            commit('SET_LOADING_SHIPPING', true)
            const subtotal = rootState.product.cart.reduce((acc, item) => acc + item.qty * item.price, 0);
            const discountType = process.env.VUE_APP_TYPE_OF_DISCOUNT;
            const discountValue = parseFloat(process.env.VUE_APP_DISCOUNT);
            if (discountType === 'PERCENTAGE') {
                const discountAmount = subtotal * (discountValue / 100);
                commit('SET_MIN_VALUE_SHIPPING_FREE', discountAmount );
                commit('SET_MIN_SUBTOTAL_FOR_SHIPPING_FREE', (shippingPrice - discountAmount) * discountValue  );
            } else if (discountType === 'VALUE') {
                const discountAmount = discountValue - subtotal;
                commit('SET_MIN_VALUE_SHIPPING_FREE', discountValue );
                commit('SET_MIN_SUBTOTAL_FOR_SHIPPING_FREE', discountAmount );
            }
            commit('SET_LOADING_SHIPPING', false)
        } catch (error) {
            commit('SET_LOADING_SHIPPING', false)
            console.error('Erro ao calcular frete grátis:', error);
        }
    },
}

const getters = {
    getCEP: state => state.CEP,
    getShippingSelect: state => state.shippingSelect,
    getShippingMethods: state => state.shippingMethods,
    getLoadingShipping: state => state.loadingShipping,
    getShowModalRastreio: state => state.showModalRastreio,
    getMinSubtotalforShippingFree: state => state.minSubtotalforShippingFree,
    getMinValueShippingFree: state => state.minValueShippingFree
}

export default {
    state,
    getters,
    mutations,
    actions
};