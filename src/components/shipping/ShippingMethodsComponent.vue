<template>
    <main>
        <div v-if="showFreteCalculado" @click="showCalculo = !showCalculo" class="flex items-center text-blue-800 cursor-pointer">
            <svg class="w-6 h-6 mr-1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" version="1.1" id="Layer_1" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M24.43,40.153c0.186,0.276,0.497,0.441,0.829,0.441h0c0.333,0,0.644-0.166,0.829-0.441l9.436-14.018  c1.128-1.799,1.725-3.865,1.725-5.976c0-6.376-5.383-11.564-12-11.564s-12,5.188-12,11.564c0,2.114,0.599,4.184,1.749,6.012  L24.43,40.153z M25.25,10.594c5.514,0,10,4.291,10,9.564c0,1.734-0.491,3.433-1.402,4.886l-8.59,12.76l-8.584-12.726  c-0.932-1.482-1.424-3.183-1.424-4.92C15.25,14.885,19.736,10.594,25.25,10.594z"/><path d="M25.25,25.616c3.135,0,5.686-2.467,5.686-5.5s-2.55-5.5-5.686-5.5s-5.686,2.467-5.686,5.5S22.115,25.616,25.25,25.616z   M25.25,16.616c2.032,0,3.686,1.57,3.686,3.5s-1.653,3.5-3.686,3.5s-3.686-1.57-3.686-3.5S23.218,16.616,25.25,16.616z"/></svg>
            <span class="text-[12px]">
                Entrega {{ $store.state.helpers.currency }} {{ getShippingSelect.price }}: 
                <span class="font-bold">Prazo de {{ getShippingSelect.delivery_range.min }} - {{ getShippingSelect.delivery_range.max }} Dias. </span>
                <span v-if="showCalculo" class="hover:no-underline underline">Ver menos</span>
                <span v-else class="hover:no-underline underline">Ver detalhes</span>
            </span>
        </div>
        <div v-else @click="showCalculo = !showCalculo" class="flex items-center text-blue-800 cursor-pointer">
            <svg class="w-6 h-6 mr-1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" version="1.1" id="Layer_1" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M24.43,40.153c0.186,0.276,0.497,0.441,0.829,0.441h0c0.333,0,0.644-0.166,0.829-0.441l9.436-14.018  c1.128-1.799,1.725-3.865,1.725-5.976c0-6.376-5.383-11.564-12-11.564s-12,5.188-12,11.564c0,2.114,0.599,4.184,1.749,6.012  L24.43,40.153z M25.25,10.594c5.514,0,10,4.291,10,9.564c0,1.734-0.491,3.433-1.402,4.886l-8.59,12.76l-8.584-12.726  c-0.932-1.482-1.424-3.183-1.424-4.92C15.25,14.885,19.736,10.594,25.25,10.594z"/><path d="M25.25,25.616c3.135,0,5.686-2.467,5.686-5.5s-2.55-5.5-5.686-5.5s-5.686,2.467-5.686,5.5S22.115,25.616,25.25,25.616z   M25.25,16.616c2.032,0,3.686,1.57,3.686,3.5s-1.653,3.5-3.686,3.5s-3.686-1.57-3.686-3.5S23.218,16.616,25.25,16.616z"/></svg>
            <span class="text-[12px]">Calcular prazo de entrega</span>
        </div>
        <div v-show="showCalculo" class="flex items-start w-full max-w-md gap-3 mt-3">
            <div>
                <input v-model="$store.state.shipping.CEP" type="text" id="zip" class="border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" maxlength="9" placeholder="00000-000" focus>
                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" class="ml-4 text-blue-700 hover:text-blue-900 font-thin text-xs">Consultar CEP</a>
            </div>
            <button @click="calcularFrete()" class="px-5 py-2.5 text-sm font-medium text-center text-blue-700 bg-white border border-blue-700 rounded-sm cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300" type="button">
                Buscar
            </button>
        </div>
        <form v-show="showCalculo" class="mt-5 grid gap-3 text-xs max-h-44 overflow-y-auto overflow-x-hidden">
            <div v-for="method in getShippingMethods" :key="method.id" class="relative">
                <input v-model="$store.state.shipping.shippingSelect" class="peer hidden" :id="'radio_' + method.id" type="radio" name="shippingMethod" :value="method" />
                <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-2 w-2 -translate-y-1/2 rounded-full border-[5px] border-gray-300 bg-white"></span>
                <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-sm border border-gray-300 p-2" :for="'radio_' + method.id">
                    <img class="w-12 object-contain opacity-60" :src="method.company.picture" alt="method.company.name" />
                    <div class="w-full ml-5">
                        <span v-if="method.delivery_range" class="text-slate-500 text-xs leading-6 ml-2">Entrega: {{ method.delivery_range.min }} - {{ method.delivery_range.max }} Dias</span>
                        <span class="ml-2 font-semibold">{{ $store.state.helpers.currency }} {{ method.price }}</span>
                    </div>
                    <div v-if="method.isMinPrice" class="flex w-full justify-center items-center mr-5">
                        <div class="flex justify-center items-center mx-2 px-2 py-0.5 text-[10px] text-center rounded bg-orange-500 text-white transition hover:bg-orange-600">Menor preço</div>
                    </div>
                </label>
            </div>
        </form>
    </main>
</template>

<script>
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    export default {
        name: 'ShippingMethodsComponent',
        data() {
            return {
                showFreteCalculado: false,
                showCalculo: false
            }
        },
        methods: {
            ...mapActions(['obterCotacaoFrete']),
            ...mapMutations(['SET_CEP', 'SET_SHIPPING_SELECT']),

            async calcularFrete() {
                if(this.getLoadingShipping) return
                if(!this.getProduct.qty || this.getProduct.qty == undefined) this.getProduct.qty = 1
                const dadosFrete = {
                    to: { postal_code: this.getCEP },
                    products: [
                        {
                            id: this.getProduct.id.toString(),
                            height: this.getProduct.height,
                            width: this.getProduct.width,
                            length: this.getProduct.length,
                            weight: this.getProduct.weight,
                            insurance_value: (this.getProduct.price - (this.getProduct.price * this.getProduct.discount / 100)).toFixed(2),
                            quantity: this.getProduct.qty
                        }
                    ],
                };
                this.obterCotacaoFrete(dadosFrete);
            },
            async validarCEP(cep) {
                const numericValue = cep.replace(/\D/g, '');
                if(numericValue.length == 8) return true;
                return false;
            },
        },
        async mounted(){
            if (this.getCEP && await this.validarCEP(this.getCEP)){
                await this.calcularFrete().then( () => {
                    if(this.getShippingMethods && this.getShippingMethods[0] !== undefined) {
                        this.SET_SHIPPING_SELECT(this.getShippingMethods[0])
                        this.showFreteCalculado = true;
                    }
                })
            }
        },
        computed: {
            ...mapGetters(['getProduct', 'getCEP', 'getShippingSelect', 'getShippingMethods', 'getLoadingShipping']),
        },
        watch: {
            '$store.state.shipping.CEP':async function(newVal, oldVal){
                if(await this.validarCEP(newVal)){
                    this.calcularFrete()
                }
                const formattedValue = newVal.replace(/(\d{5})(\d)/,'$1-$2')
                this.SET_CEP(formattedValue)
            },
        }
    }
</script>
