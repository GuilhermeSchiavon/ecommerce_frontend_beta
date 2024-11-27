import AddressService from '../../services/AddressService'

const state = () => ({
    addressLoading: false,
    addresses: [],
    datalistEstados: 
    [
        { "sigla": "AC", "nome": "Acre" },
        { "sigla": "AL", "nome": "Alagoas" },
        { "sigla": "AP", "nome": "Amapá" },
        { "sigla": "AM", "nome": "Amazonas" },
        { "sigla": "BA", "nome": "Bahia" },
        { "sigla": "CE", "nome": "Ceará" },
        { "sigla": "DF", "nome": "Distrito Federal" },
        { "sigla": "ES", "nome": "Espírito Santo" },
        { "sigla": "GO", "nome": "Goiás" },
        { "sigla": "MA", "nome": "Maranhão" },
        { "sigla": "MT", "nome": "Mato Grosso" },
        { "sigla": "MS", "nome": "Mato Grosso do Sul" },
        { "sigla": "MG", "nome": "Minas Gerais" },
        { "sigla": "PA", "nome": "Pará" },
        { "sigla": "PB", "nome": "Paraíba" },
        { "sigla": "PR", "nome": "Paraná" },
        { "sigla": "PE", "nome": "Pernambuco" },
        { "sigla": "PI", "nome": "Piauí" },
        { "sigla": "RJ", "nome": "Rio de Janeiro" },
        { "sigla": "RN", "nome": "Rio Grande do Norte" },
        { "sigla": "RS", "nome": "Rio Grande do Sul" },
        { "sigla": "RO", "nome": "Rondônia" },
        { "sigla": "RR", "nome": "Roraima" },
        { "sigla": "SC", "nome": "Santa Catarina" },
        { "sigla": "SP", "nome": "São Paulo" },
        { "sigla": "SE", "nome": "Sergipe" },
        { "sigla": "TO", "nome": "Tocantins" }
    ]
})
  
const mutations = {
    SET_ADDRESS: (state, payload) => {
        state.addresses = payload.address;
    },
    UPDATE_ADDRESS: (state, payload) => {
        state.addresses = payload.address;
    },
    SET_LOADING_ADDRESS: (state, payload) => {
        state.addressLoading = payload
    },
}

const actions = {
    async addressUser({commit}){
        try {
            commit('SET_LOADING_ADDRESS', true);
            const response = await AddressService.get();
            commit('SET_ADDRESS', response.data);
            commit('SET_LOADING_ADDRESS', false);
        } catch (error) {
            commit('SET_LOADING_ADDRESS', false);
            commit('LOG_USER_OUT');
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async addAddress({commit}, Address){
        try {
            commit('SET_LOADING_ADDRESS', true);
            const response = await AddressService.create(Address);
            commit('UPDATE_ADDRESS', response.data);
            commit('SET_CEP', Address.zip);
            commit('SET_ALERT', {
                heading: 'success',
                message: "Novo Endereço Criado"
            });
            commit('SET_LOADING_ADDRESS', false);
        } catch (error) {
            commit('SET_LOADING_ADDRESS', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async submitUpdateAddress({commit}, Address){
        try {
            commit('SET_LOADING_ADDRESS', true);
            const response = await AddressService.update(Address);
            commit('UPDATE_ADDRESS', response.data);
            commit('SET_CEP', Address.zip);
            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('SET_LOADING_ADDRESS', false);
        } catch (error) {
            commit('SET_LOADING_ADDRESS', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async deleteAddress({commit}, idAddress){
        try {
            commit('SET_LOADING_ADDRESS', true);
            const response = await AddressService.delete(idAddress);

            commit('SET_ALERT', {
                heading: 'success',
                message: response.data.message
            });
            commit('SET_LOADING_ADDRESS', false);
        } catch (error) {
            commit('SET_LOADING_ADDRESS', false);
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response.data.message
            });
        }
    },
    async searchAddress({ commit }, cep) {
        try {
            const response = await AddressService.getViaCep(cep);
            if (response.data.erro) {
                commit('SET_ALERT', {
                    heading: 'error',
                    message: 'CEP não encontrado.'
                });
            } else {
                return response.data;
            }
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: 'Não foi possível buscar o endereço.'
            });
        }
      }
}

const getters = {
    getAddresses: state => state.addresses,
    getLoadingAddress: state => state.addressLoading,
    getDatalistEstados: state => state.datalistEstados
}

export default {
    state,
    getters,
    mutations,
    actions
};