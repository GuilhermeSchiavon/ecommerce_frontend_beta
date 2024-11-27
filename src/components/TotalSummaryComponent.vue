<template>
    <div class="flex justify-end border-t border-gray-100">
        <div class="w-screen max-w-lg space-y-4 ">
        <dl v-if="CardShippingMethodSelect" class="grid grid-cols-6 gap-3 space-y-0.5 text-sm text-gray-700">
            <div class="">
                <dt class="text-sm font-medium">Subtotal</dt>
                <dt>Frete</dt>
                <dt class="text-xl font-bold">Total</dt>
            </div>
            <div class="col-span-2">
                <dd class="text-sm font-medium">{{$store.state.helpers.currency}} {{(getCart.reduce((acc, item) => acc + item.qty * item.price, 0)).toFixed(2)}}</dd>
                <dd :class="{ 'line-through' : getMinSubtotalforShippingFree <= 0}">{{$store.state.helpers.currency}}  {{CardShippingMethodSelect.price}}</dd>
                <dd class="text-lg font-bold">{{$store.state.helpers.currency}} {{ getTotal.toFixed(2) }}</dd>
            </div>
            <div v-if="getMinSubtotalforShippingFree" class="flex col-span-3 text-sm rounded items-center font-bold">
                <div v-if="getMinSubtotalforShippingFree > 0" class="px-3 py-1 text-red-700 bg-orange-100">
                    <span>Compre mais <span class="whitespace-nowrap">{{$store.state.helpers.currency }} {{ getMinSubtotalforShippingFree }}</span> e ganhe FRETE GRÁTIS</span>
                </div>
                <div v-else-if="getMinSubtotalforShippingFree <= 0" class="flex items-center gap-1 px-3 py-1 text-green-700 bg-green-100">
                    <svg class="w-4 h-4 font-bold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    FRETE GRÁTIS
                </div>
            </div>
        </dl>
        <div class="flex justify-end">
            <button @click="event" class="block w-full px-5 py-3 text-center rounded bg-red-500 text-sm text-white transition hover:bg-red-600">
            Finalizar Compra
            </button>
        </div>
        <div v-if="deliveryMessage" class="flex justify-center items-center">
            <svg class="w-5 h-5 mr-2 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" /><path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" /><path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" /></svg>
            <span class="text-[11px] font-semibold text-green-700">{{ deliveryMessage }}</span>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'TotalSummary',
        data() {
            return {
                paymentMethod: '',
                CardShippingMethodSelect: null,
            }
        },
        methods: {
            ...mapActions(['obterCotacaoFrete', 'calculateShippingFree']),

            event(){
                this.$emit('event', this.paymentMethod)
            },
            async getMostFrequentShippingMethod() {
                const shippingMethodCount = {};
                    this.getCart.forEach(item => {
                        if(item.shippingMethod && item.shippingMethod.id){
                            const shippingMethodId = item.shippingMethod.id;
                            if (shippingMethodCount[shippingMethodId]) {
                                shippingMethodCount[shippingMethodId]++;
                            } else {
                                shippingMethodCount[shippingMethodId] = 1;
                            }
                        }
                    });

                    let mostFrequentShippingMethodId;
                    let maxCount = 0;

                    for (const id in shippingMethodCount) {
                        if (shippingMethodCount[id] > maxCount) {
                            mostFrequentShippingMethodId = id;
                            maxCount = shippingMethodCount[id];
                        }
                    }
                    return mostFrequentShippingMethodId;
            },
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
                await this.obterCotacaoFrete(dadosFrete);
                const mostFrequentShippingMethodId = await this.getMostFrequentShippingMethod();
                let shippingMethodSelect = await this.getShippingMethods.find(method => method.id == mostFrequentShippingMethodId);
                // Se não encontrarmos o mais frequente, pegue o que possui isMinPrice
                if (!shippingMethodSelect) { 
                    shippingMethodSelect =  await this.getShippingMethods.find(method => method.isMinPrice);
                }
                this.CardShippingMethodSelect = shippingMethodSelect
            },
            async validarCEP(cep) {
                const numericValue = cep.replace(/\D/g, '');
                if(numericValue.length == 8) return true;
                return false;
            },
            async colcularTotais(){
                await this.calcularFrete()
                if(this.CardShippingMethodSelect && this.CardShippingMethodSelect.price){
                    await this.calculateShippingFree(this.CardShippingMethodSelect.price);
                }
            },
        },
        async mounted(){
            if (this.getCEP && await this.validarCEP(this.getCEP)){
                await this.colcularTotais();
            }
        },
        filters: {
            shoten: function(desc){
                if(desc.length >= 30 ){
                    return desc.substring(0, 30) + '...'
                }
                return desc;
            },
            addDecimals: function(num){
                return (Math.round(num * 100) / 100).toFixed(2);
            }
        },
        computed: {
            ...mapGetters(['getShippingSelect', 'getCart', 'getCEP', 'getShippingMethods', 'getLoadingShipping', 'getMinSubtotalforShippingFree']),
        
            getTotal() {
                const valeuShipping = this.getMinSubtotalforShippingFree > 0 ? Number(this.getShippingSelect.price) : 0;
                const valueProducts = this.getCart.reduce((accumulator, product) => {
                    const priceWithDiscount = product.price * (1 - product.discount / 100);
                    return accumulator + (priceWithDiscount * this.getCart.find(item => item.id === product.id).qty);
                }, 0);
                
                return valueProducts + valeuShipping;
            },
            deliveryMessage() {
                // Função para calcular a data de entrega com base na data atual e no tempo de entrega do frete
                function calculateDeliveryDate(deliveryTime) {
                    const today = new Date();
                    const deliveryDate = new Date(today);
                    deliveryDate.setDate(today.getDate() + deliveryTime);
                    return deliveryDate;
                }

                // Função para formatar a data como "dd/mm"
                function formatDate(date) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    return `${day}/${month}`;
                }

                // Calculando a data de entrega
                if(!this.CardShippingMethodSelect || !this.CardShippingMethodSelect.delivery_time) return;

                const deliveryDate = calculateDeliveryDate(this.CardShippingMethodSelect.delivery_time);

                // Formatando a data
                const formattedDate = formatDate(deliveryDate);

                // Construindo a string com base nos dados
                return `Receba até ${formattedDate} comprando hoje até as 14:00`;
            }
        },
        watch: {
            '$store.state.product.cart': {
                deep: true,
                handler() {
                    this.colcularTotais()
                }
            },
            '$store.state.shipping.CEP':async function(newVal){
                if(await this.validarCEP(newVal)){
                    this.calcularFrete()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    @media only screen and (min-width: 740px){
        .__to_checkout {
            max-width: 400px
        }
    }
</style>