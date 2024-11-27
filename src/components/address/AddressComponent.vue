<template>
    <div v-if="$store.state.address.addressLoading">
        <SpinnerComponent class="m-auto" />
    </div>
    <section v-else class="max-w-4xl w-full mx-auto">
        <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-gray-700">Endereço de Entrega</h2>
            <button @click="clear(), showEdit = true, newAddress = true, ocultarCamps = true" class="flex items-center justify-center font-medium text-gray-600 bg-gray-50 px-6 text-xs py-2 border hover:bg-gray-300">
                <svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 6.5C23 3.46243 20.5376 1 17.5 1C14.4624 1 12 3.46243 12 6.5C12 9.53757 14.4624 12 17.5 12C20.5376 12 23 9.53757 23 6.5ZM18.0006 7.00001L18.0011 9.50352C18.0011 9.77966 17.7773 10.0035 17.5011 10.0035C17.225 10.0035 17.0011 9.77966 17.0011 9.50352L17.0006 7.00001H14.4961C14.22 7.00001 13.9961 6.77615 13.9961 6.50001C13.9961 6.22387 14.22 6.00001 14.4961 6.00001H17.0005L17 3.49927C17 3.22313 17.2239 2.99927 17.5 2.99927C17.7761 2.99927 18 3.22313 18 3.49927L18.0005 6.00001H20.503C20.7792 6.00001 21.003 6.22387 21.003 6.50001C21.003 6.77615 20.7792 7.00001 20.503 7.00001H18.0006Z" fill="#212121"/><path d="M19.5 19.747V12.6865C20.0335 12.5142 20.5368 12.2747 21 11.9782V19.747C21 20.7135 20.2165 21.497 19.25 21.497H15.75C14.7835 21.497 14 20.7135 14 19.747V14.247C14 14.1089 13.8881 13.997 13.75 13.997H10.25C10.1119 13.997 9.99999 14.1089 9.99999 14.247V19.747C9.99999 20.7135 9.2165 21.497 8.25 21.497H4.75C3.7835 21.497 3 20.7135 3 19.747V9.94425C3 9.28109 3.29255 8.6517 3.79952 8.22419L10.5495 2.53208C11.1612 2.01623 11.9793 1.87698 12.7025 2.11432C12.3057 2.54807 11.967 3.0358 11.6987 3.56521C11.6341 3.59353 11.5727 3.63139 11.5165 3.67878L4.76651 9.37089C4.59752 9.5134 4.5 9.72319 4.5 9.94425V19.747C4.5 19.8851 4.61193 19.997 4.75 19.997H8.25C8.38807 19.997 8.49999 19.8851 8.49999 19.747V14.247C8.49999 13.2805 9.2835 12.497 10.25 12.497H13.75C14.7165 12.497 15.5 13.2805 15.5 14.247V19.747C15.5 19.8851 15.6119 19.997 15.75 19.997H19.25C19.3881 19.997 19.5 19.8851 19.5 19.747Z" fill="#212121"/></svg>
                Adcionar Endereço
            </button>
        </div>
        <form v-show="showEdit">
            <div v-if="!ocultarCamps" class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">                        
                <div class="col-span-2">
                    <label class="labelStyle" for="street">Rua</label>
                    <input v-model="newObjAddress.street" type="text" id="street" class="inputStyle" disabled>
                </div>
                <div >
                    <label class="labelStyle" for="number">Número</label>
                    <input v-model="newObjAddress.number" type="text" id="number" class="inputStyle">
                </div>
            </div>
            <div v-if="!ocultarCamps" class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="labelStyle" for="neighborhood">Bairro</label>
                    <input v-model="newObjAddress.neighborhood" type="text" id="neighborhood" class="inputStyle" disabled>
                </div>
                <div >
                    <label class="labelStyle" for="complement">Complemento</label>
                    <input v-model="newObjAddress.complement" type="text" id="complement" class="inputStyle">
                </div>
            </div>
            <div v-if="!ocultarCamps" class="mt-4">
                <label class="labelStyle" for="city">Cidade</label>
                <input v-model="newObjAddress.city" type="text" id="city" class="inputStyle" disabled>
            </div>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">                        
                <div >
                    <label class="labelStyle" for="zip">CEP</label>
                    <input v-model="newObjAddress.zip" type="text" id="zip" class="inputStyle" maxlength="9" focus>
                </div>
                <div v-if="!ocultarCamps">
                    <label class="labelStyle" for="state">Estado</label>
                    <input v-model="newObjAddress.state" type="text" id="state" list="dtState" class="inputStyle" maxlength="2" disabled>
                    <datalist id="dtState">
                        <option v-for="(optState, indexState) in getDatalistEstados" :key="indexState" :value="optState.sigla">{{ optState.nome }}</option>
                    </datalist>
                </div>
                <div v-if="!ocultarCamps">
                    <label class="labelStyle" for="country">País/Região</label>
                    <input v-model="newObjAddress.country" type="text" id="country" class="inputStyle" disabled>
                </div>
            </div>
            <div class="flex justify-end my-4 space-x-2">
                <button type="button" @click="validarAddress" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-sm hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Gravar</button>
                <button @click=" cancelar()" type="button" class="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gray-100 rounded-sm hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Cancelar</button>
            </div>
        </form>
        <article v-for="address in addresses" :key="address.id" @click="updateAddress(address)" class="group mb-1 bg-white border border-gray-200 p-3 sm:p-3 shadow-sm transitionw cursor-pointer">
            <div class="flex justify-between">
                <h3 class="mt-0.5 font-normal text-gray-900">
                    {{address.street}}, {{ address.number }} - {{ address.complement }}
                </h3>
                <div v-if="address.default" class="flex h-7 ml-4 text-sm font-thin bg-blue-500 px-3 py-1 max-h-7 border rounded-md text-white items-center">
                    <svg class="w-3 h-3 md:mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="hidden md:block text-[11px]">
                        Padrão
                    </span>
                </div>
                <div v-else @click="newAddress = false,  newObjAddress = address, validarAddress()" class="hidden group-hover:flex h-7 text-sm font-thin group-hover:bg-gray-100 px-3 py-1 border rounded-md group-hover:text-gray-400 hover:font-semibold hover:bg-blue-500 items-center">
                    <svg class="w-4 h-4 md:mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="hidden md:block text-[11px] whitespace-nowrap">
                        Definir como Padrão
                    </span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="text-xs leading-relaxed text-gray-500 line-clamp-3">
                    CEP {{address.zip}}  &nbsp; {{ address.neighborhood }}, {{address.city}}, {{address.state}} 
                </p>
                <div class="group m-2 inline-flex items-center gap-1 text-sm font-medium text-gray-100">
                    <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:text-gray-400" @click="deleteAddress(address.id).then(() => carregarAddress())" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </article>
       
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import SpinnerComponent from '../helper/SpinnerComponent.vue'
    export default {
        name: 'AddressComponent',
        components: {
            SpinnerComponent
        },
        data() {
            return {
                ocultarCamps: false,
                newAddress: false,
                addresses: null,
                showEdit: false,
                objAddress:{
                    zip: '',
                    street: '',
                    number: '',
                    complement: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    country: ''
                },
                newObjAddress:{
                    id: '',
                    zip: '',
                    street: '',
                    number: '',
                    complement: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    country: ''
                }
            }
        },
        methods: {
            ...mapActions(['addressUser', 'submitUpdateAddress', 'addAddress', 'searchAddress', 'deleteAddress']),
            ...mapMutations(['SET_ALERT']),

            updateAddress(address){
                this.newObjAddress.id = address.id || ''
                this.newObjAddress.zip = address.zip
                this.newObjAddress.street = address.street
                this.newObjAddress.number = address.number
                this.newObjAddress.complement = address.complement
                this.newObjAddress.neighborhood = address.neighborhood
                this.newObjAddress.city = address.city
                this.newObjAddress.state = address.state
                this.newObjAddress.country = address.country
                this.showEdit = true, 
                this.newAddress = false
            },
            carregarAddress(){
                this.addressUser().then(() => {
                    this.addresses = this.getAddresses.rows;
                })
            },
            validarAddress(){
                if (!this.newObjAddress.zip) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o CEP.'});
                    return;
                } else if (!/^\d{5}-\d{3}$/.test(this.newObjAddress.zip)) {
                    this.SET_ALERT({ heading: 'error', message: 'CEP inválido.'})
                    return;
                }
                if (!this.newObjAddress.street) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe a rua.'})
                    return;
                }
                if (!this.newObjAddress.number) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o número.'})
                    return;
                } else if (!/^\d+$/.test(this.newObjAddress.number)) {
                    this.SET_ALERT({ heading: 'error', message: 'Número inválido.'})
                    return;
                }
                if (!this.newObjAddress.neighborhood) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o bairro.'})
                    return;
                }
                if (!this.newObjAddress.complement) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe um complemento.'})
                    return;
                }
                if (!this.newObjAddress.city) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe a cidade.'})
                    return;
                }
                if (!this.newObjAddress.state) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o estado.'})
                    return;
                } else if (!/^[A-Z]{2}$/.test(this.newObjAddress.state)) {
                    this.SET_ALERT({ heading: 'error', message: 'Estado inválido.'})
                    return;
                }
                if (!this.newObjAddress.country) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o país.'})
                    return;
                }
                if(this.newAddress) {
                    this.addAddress(this.newObjAddress).then(() => {
                        this.carregarAddress()
                        this.clear()
                    })
                }else {
                    this.submitUpdateAddress(this.newObjAddress)
                    .then(() => {
                        this.carregarAddress()
                        this.clear()
                    })
                }
            },
            clear(){
                this.newObjAddress = {
                    zip: '',
                    street: '',
                    number: '',
                    complement: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                    country: ''
                };

                this.showEdit = false;
            },
            cancelar(){
                this.clear();
                this.ocultarCamps = false;
            },
            buscaViaCEP(zip){
                this.searchAddress(zip).then((data) => {
                    if(data !== undefined) {
                        this.ocultarCamps = false;
                        this.newObjAddress.street = data.logradouro;
                        this.newObjAddress.neighborhood = data.bairro;
                        this.newObjAddress.city = data.localidade;
                        this.newObjAddress.state = data.uf;
                        this.newObjAddress.country = "Brasil";
                        // data.complemento != '' ?  this.objAddress.complement = data.complemento: '';
                    }
                })
            }
        },
        async mounted() {
            await this.carregarAddress();
            if(!this.getAddresses || !this.getAddresses.rows || !this.getAddresses.rows.length || this.getAddresses.rows.length == 0 || this.getAddresses.rows.length == undefined){
                this.clear();
                this.showEdit = true;
                this.newAddress = true;
                this.ocultarCamps = true;
            }
        },
        computed:{
            ...mapGetters(['getAddresses', 'getDatalistEstados']),
        },
        watch: {
            'newObjAddress.zip': function(newVal, oldVal){
                // remove tudo que não é número
                const numericValue = newVal.replace(/\D/g, '');
                // if(this.newAddress){
                    if(numericValue.length == 8 && oldVal != newVal){
                        // Buscar ViaCEP
                        this.buscaViaCEP(numericValue)
                    }
                // }
                // const formattedValue = numericValue.slice(0, 5) + '-' + numericValue.slice(5, 8);
                const formattedValue = numericValue.replace(/(\d{5})(\d)/,'$1-$2')

                this.newObjAddress.zip = formattedValue

            },
            'newObjAddress.number': function(newValNumber){
                this.newObjAddress.number = newValNumber.toString().replace(/\D/g, '');
            },
            // 'newObjAddress.state': function (newVal, oldVal){
            //     this.newObjAddress.state = newVal.toString().toUpperCase();

            //     const encontrou = this.getDatalistEstados.some((item) => item.sigla.toUpperCase().includes(newVal.toUpperCase()));

            //     if (!encontrou) {
            //         this.newObjAddress.state = oldVal;
            //     }
            // },
        }
       
    }
</script>