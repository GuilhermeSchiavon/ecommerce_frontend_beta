<template>
    <main>
        <p class="text-lg font-semibold text-gray-700">Método de Envio</p>
        <form class="mt-2 grid gap-3 text-xs max-h-40 overflow-y-auto overflow-x-hidden">
            <div v-for="(method, index) in getShippingMethods" :key="method.id" class="relative">
                <input v-model="$store.state.shipping.shippingSelect" class="peer hidden" :id="'radio_' + method.id" type="radio" name="shippingMethod" :value="method" />
                <span class="peer-checked:border-gray-700 hidden sm:block absolute right-4 top-1/2 box-content  h-2 w-2 -translate-y-1/2 rounded-full border-[5px] border-gray-300 bg-white"></span>
                <label class="peer-checked:border-2 peer-checked:border-gray-400 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-sm border border-gray-300 p-2 sm:pr-8" :for="'radio_' + method.id">
                    <img class="w-12 object-contain opacity-60" :src="method.company.picture" :alt="method.company.name" />
                    <div class="w-full ml-2 sm:ml-5 flex flex-wrap">
                        <div class="flex flex-wrap items-center">
                            <div v-if="method.delivery_range" class="whitespace-nowrap">Entrega: {{ method.delivery_range.min }} - {{ method.delivery_range.max }} Dias &nbsp;</div>
                            <div class="whitespace-nowrap">{{ $store.state.helpers.currency }} {{ method.price }}</div>
                        </div>
                    </div>
                    <div class="w-full flex flex-wrap content-center gap-0.5">
                        <div v-if="getMinValueShippingFree >= method.price" class="flex justify-start items-center outline-none">
                            <div class="flex justify-center items-center mx-0.5 px-2 py-0.5 text-[10px] text-center rounded bg-green-500 text-white transition hover:bg-green-600">Gratis</div>
                        </div>
                        <div v-else-if="method.isMinPrice" class="flex justify-start items-center outline-none">
                            <div class="flex justify-center items-center mx-0.5 px-2 py-0.5 text-[10px] text-center rounded bg-orange-500 text-white transition hover:bg-orange-600">Menor preço</div>
                        </div>
                        <div v-if="index == 0" class="flex justify-start items-center outline-none">
                            <div class="flex justify-center items-center mx-0.5 px-2 py-0.5 text-[10px] text-center rounded bg-yellow-500 text-white transition hover:bg-yellow-600">Mais Rápido</div>
                        </div>
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
        methods: {
            ...mapActions(['obterCotacaoFrete', 'calculateShippingFree']),
            ...mapMutations(['SET_CEP', 'SET_SHIPPING_SELECT']),

            async calcularFrete() {
                const products = this.getCart.map(item => ({
                    id: item.id.toString(),
                    height: item.height,
                    width: item.width,
                    length: item.length,
                    weight: item.weight,
                    insurance_value: (item.price - (item.price * item.discount / 100)).toFixed(2),
                    quantity: item.qty
                }));
                const dadosFrete = {
                    to: { postal_code: this.getCEP },
                    products
                };
                this.obterCotacaoFrete(dadosFrete);
            },
            async validarCEP(cep) {
                const numericValue = cep.replace(/\D/g, '');
                if(numericValue.length == 8) return true;
                return false;
            },
        },
        async mounted() {
            if (this.getCEP && await this.validarCEP(this.getCEP)) {
                await this.calcularFrete().then(async () => {
                    if (this.getShippingMethods && this.getShippingMethods[0] !== undefined) {
                        if (this.getShippingSelect) {
                            const isSelected = this.getShippingMethods.some(method => method.price === this.getShippingSelect.price);
                            if (isSelected) return;
                        }
                        this.SET_SHIPPING_SELECT(this.getShippingMethods[0]);
                    }
                });
                if (this.getShippingSelect && this.getShippingSelect.price) 
                await this.calculateShippingFree(this.getShippingSelect.price);
            }
        },
        computed: {
            ...mapGetters(['getCart', 'getCEP', 'getShippingSelect', 'getShippingMethods', 'getLoadingShipping', 'getMinSubtotalforShippingFree', 'getMinValueShippingFree']),
        },
        watch: {
            '$store.state.shipping.CEP':async function(newVal, oldVal){
                if(await this.validarCEP(newVal)){
                    this.calcularFrete()
                }
                const formattedValue = newVal.replace(/(\d{5})(\d)/,'$1-$2')
                this.SET_CEP(formattedValue)
            },
            '$store.state.shipping.shippingSelect':async function(newVal, oldVal){
                await this.calculateShippingFree(newVal.price);
            },
        }
    }
</script>
