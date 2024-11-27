<template>
    <div>
        <h1 class="text-gray-800 font-bold text-3xl capitalize">{{getProduct.name}}</h1>
        <div v-if="getProduct.num_reviews" class="flex items-center pt-5 pb-2">
            <StarsComponent :rating="+getProduct.avg_rating.replaceAll( ',' , '.' )"/>
            <p @click="$emit('reviews')" class="text-xs cursor-pointer hover:underline font-medium text-gray-500 hover:text-gray-700 ml-3">({{getProduct.num_reviews}} avaliações de clientes)</p>
        </div>
        <p v-if="getProduct.quantity < 10" class="text-xs font-bold text-red-500 mt-1">
            Restam apenas {{ getProduct.quantity }}
        </p>
        <dl class="mt-2 space-y-px text-sm text-gray-600">
            <section v-if="getProduct.discount">
                <div>
                    <dd class="inline line-through">{{$store.state.helpers.currency}} {{getProduct.price}}</dd>
                </div>
                <div class="flex items-center">
                    <div>
                        <dd class="font-bold text-2xl text-gray-800">
                            {{$store.state.helpers.currency}} {{getDiscountedPrice().toString().split('.')[0]}}
                        </dd>
                    </div>
                    <dd class=" font-thin">,{{ getDiscountedPrice().toString().split('.')[1]  }}</dd>
                    <div class="text-xs text-white ml-2 bg-red-600 py-0.5 px-1 rounded-sm">
                    -{{getProduct.discount.toFixed(0)}}%
                    </div>
                </div>
            </section>
            <section v-else class="flex items-center">
                <div>
                    <dd class="font-bold text-2xl text-gray-800">{{$store.state.helpers.currency}} {{ getProduct.price.toString().split('.')[0] }}</dd>
                </div>
                <dd class=" font-thin">,{{ getProduct.price.toString().split('.')[1]  }}</dd>
            </section>
        </dl>
        <hr class="mt-2">

        <Variations v-for="(group, characteristicId) in groupedVariations" :key="characteristicId" :characteristic="group" />
        
        <div v-if="getProduct.sizeGuide" @click="SHOW_MODAL_VERIFICAR_TAMANHO(true)" class="flex items-center text-blue-800 mt-5 cursor-pointer">
            <svg class="w-5 h-5 mr-2 " xmlns="http://www.w3.org/2000/svg"  fill="currentColor" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve"><path class="st0" d="M150.932,218.624c10.84,3.192,23.58,4.988,37.258,4.996c18.245-0.023,34.79-3.17,47.434-8.668   c6.318-2.771,11.72-6.126,15.866-10.39c4.108-4.204,7.071-9.718,7.064-15.939c0.007-6.222-2.956-11.742-7.064-15.94   c-6.237-6.362-15.216-10.825-26.048-14.062c-10.833-3.192-23.572-4.995-37.251-4.995c-18.244,0.014-34.79,3.162-47.441,8.668   c-6.318,2.771-11.72,6.125-15.865,10.389c-4.108,4.198-7.072,9.718-7.065,15.94c-0.007,6.221,2.956,11.734,7.065,15.939   C131.12,210.917,140.106,215.387,150.932,218.624z M135.754,183.213c3.303-3.495,10.249-7.404,19.464-10.079   c9.207-2.72,20.64-4.382,32.972-4.374c16.434-0.023,31.288,2.97,41.374,7.404c5.04,2.187,8.846,4.744,11.048,7.05   c2.246,2.357,2.8,4.05,2.808,5.41c-0.008,1.352-0.562,3.052-2.808,5.409c-3.296,3.488-10.242,7.404-19.457,10.079   c-9.207,2.72-20.632,4.375-32.965,4.375c-16.441,0.014-31.294-2.971-41.381-7.404c-5.04-2.188-8.846-4.744-11.054-7.05   c-2.246-2.357-2.794-4.057-2.801-5.409C132.96,187.263,133.508,185.57,135.754,183.213z"/><path class="st0" d="M288.2,109.155c0.044,0.015,0.096,0.029,0.14,0.044l0.584,0.17L288.2,109.155z"/><path class="st0" d="M88.172,402.845c-0.059-0.014-0.119-0.037-0.178-0.059l-0.732-0.214L88.172,402.845z"/><path class="st0" d="M376.372,243.659v-55.037c0.008-8.114-1.929-15.888-5.224-22.922c-3.304-7.05-7.929-13.397-13.42-19.043   c-16.412-16.766-40.488-28.812-69.388-37.458l-0.155-0.044c-29.041-8.564-63.262-13.397-99.996-13.405   c-48.993,0.044-93.448,8.528-127.262,23.24l-0.015,0.008c-16.885,7.404-31.316,16.405-42.276,27.666   C13.154,152.303,8.528,158.65,5.225,165.7C1.929,172.735-0.008,180.509,0,188.623v134.756c-0.008,8.113,1.929,15.88,5.225,22.915   c3.303,7.05,7.929,13.397,13.412,19.043c16.413,16.766,40.472,28.812,69.358,37.45l0.192,0.059   c29.049,8.565,63.262,13.39,100.003,13.405H512v-172.59H376.372z M37.658,165.101c11.38-11.838,31.82-22.856,58.03-30.548   c26.204-7.737,58.119-12.326,92.502-12.319c45.838-0.022,87.308,8.18,116.659,21.031c14.676,6.399,26.27,13.966,33.866,21.836   c7.634,7.929,11.166,15.739,11.174,23.521c-0.008,7.773-3.54,15.592-11.174,23.521c-11.38,11.83-31.819,22.848-58.03,30.541   c-26.204,7.744-58.112,12.326-92.496,12.326c-45.845,0.015-87.314-8.187-116.666-21.031c-14.676-6.399-26.27-13.966-33.866-21.836   c-7.634-7.929-11.166-15.748-11.174-23.521C26.492,180.841,30.024,173.03,37.658,165.101z M349.888,222.341v32.669h-58.23   c6.746-2.202,13.256-4.552,19.249-7.168c15.954-6.983,29.145-15.348,38.684-25.176L349.888,222.341z M485.516,389.766h-45.402   v-66.854h-15.134v66.854h-33.416v-36.209h-15.134v36.209h-33.423v-66.854h-15.134v66.854h-33.423v-36.209h-15.134v36.209h-33.415   v-66.854h-15.134v66.854h-33.415v-36.209h-15.134v36.076c-11.491-0.177-22.657-0.857-33.423-2.01v-64.711h-15.134v62.76   c-23.772-3.621-45.054-9.459-62.138-16.937c-14.676-6.399-26.27-13.966-33.866-21.836c-7.634-7.93-11.166-15.748-11.174-23.521   V222.341l0.296,0.325c14.314,14.706,36.8,26.277,64.621,34.532c27.83,8.217,61.053,12.939,96.788,12.946h297.326V389.766z"/></svg>
            <span class="text-[12px] font-bold">Verifique o tamanho</span>
        </div>
        <div class="py-6 flex items-center space-x-2">
            <div>
                <label for="Quantity" class="sr-only"> Quantity </label>
                <div class="flex items-center border border-gray-200 rounded">
                    <button @click="qty--" type="button" class="w-6 h-4 mb-2.5 text-gray-600 transition opacity-50 hover:opacity-100">
                        &minus;
                    </button>
                    <input @change="qty" v-model.number="qty" type="number" id="Quantity" value="1" class="w-10 h-12 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" name="custom-input-number"  />
                    <button @click="qty++" type="button" :class="{ 'text-white ' : qty == qtyMax }" class="w-6 h-4 mb-2.5 text-gray-600 transition opacity-50 hover:opacity-100">
                        &plus;
                    </button>
                </div>
            </div>
            <button @click="addToCard({...getProduct, qty})" style="background-color: #303133;" class="transition duration-300 rounded-sm ease-in-out h-12 border-transparent text-white hover:bg-transparent text-sm font-semibold hover:text-gray-300 items-center flex py-3 px-7 border hover:border-gray-700 ">
                Adicionar ao Carrinho
            </button>
            <div class="transition ease-in-out h-12 w-12 border rounded-full flex hover:shadow-md duration-400 items-center justify-center">
                <button @click="REMOVE_FROM_LIKED(getProduct)" v-if="isAvilable(getProduct.id, 'liked')">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="#FF7F7F"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button @click.prevent="ADD_TO_LIKED({...getProduct, qty: 1})" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-800" height="22px" viewBox="0 0 24 24" width="22px" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                </button>
            </div>
        </div>
        <ModalSizeGuideComponent v-show="getShowModalVerificarTamanho"/>
        <ShippingMethods />
        <RelationProduct v-if="getProduct && getProduct.Relations" :products="getProduct.Relations[0]" class="py-6" /> 
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import StarsComponent from './reviews/StarsComponent.vue'
    import Variations from './VariationsComponent.vue'
    import RelationProduct from './RelationProductComponent.vue'
    import ShippingMethods from '../shipping/ShippingMethodsComponent.vue'
    import ModalSizeGuideComponent from "@/components/product/ModalSizeGuideComponent.vue";

    export default {
        name: 'Information',
        components: {
            StarsComponent,
            Variations,
            RelationProduct,
            ShippingMethods,
            ModalSizeGuideComponent
        },
        data() {
            return {
                qty: 1,
                qtyMax: 1,
            }
        },
        computed: {
            ...mapGetters(['getProduct', 'getCart', 'getLiked', 'getProductVariation', 'getShippingSelect', 'getShowModalVerificarTamanho']),

            groupedVariations() {
                if (this.getProduct && this.getProduct.ProductCharVariations) {
                    return this.groupVariationsByCharacteristicId(this.getProduct.ProductCharVariations);
                }
                return {};
            },
        },
        async mounted(){
            await this.$nextTick();
            this.updateQtyMax();
        },
        methods: {
            ...mapActions(['addToCard', 'obterCotacaoFrete']),
            ...mapMutations(['ADD_TO_LIKED', 'REMOVE_FROM_LIKED', 'SHOW_MODAL_VERIFICAR_TAMANHO']),

            scrollMeTo() {
                this.$emit('scrollmeto')
            },
            isAvilable(id, type){
                if(type === 'liked'){
                    return this.getLiked.find(x => x.id === id) ? true : false;
                }
            },
            groupVariationsByCharacteristicId(variations) {
                return variations.reduce((groupedVariations, variation) => {
                const { CharacteristicId, Characteristic } = variation;
                
                if (!groupedVariations[CharacteristicId]) {
                    groupedVariations[CharacteristicId] = {
                        Characteristic,
                        variations: [],
                    };
                }
                if(variation.status == 'ativo') groupedVariations[CharacteristicId].variations.push(variation);
                
                return groupedVariations;
                }, {});
            },
            getDiscountedPrice() {
                const price = this.getProduct.price
                const discountPercentage = this.getProduct.discount;
                const discountedPrice = price - (price * discountPercentage / 100);
                return discountedPrice.toFixed(2);
            },
            updateQtyMax() {
                let qtyMax = 0;

                if(this.getProduct && this.getProduct.quantity) 
                    qtyMax = this.getProduct.quantity;

                const hasActiveVariation = this.getProduct.ProductCharVariations.some(
                    (variation) => variation.status === 'ativo'
                );

                if(hasActiveVariation){
                    if (this.getProductVariation) {

                        qtyMax = this.getProductVariation.quantity;

                        const hasItemVarCard = this.getCart.find((item) => item.variationSelected.id === this.getProductVariation.id);
                        
                        if (hasItemVarCard) qtyMax -= hasItemVarCard.qty;
                    }
                }else{
                    const hasItemCard = this.getCart.find((item) => item.id === this.getProduct.id);
                    if (hasItemCard) qtyMax -= hasItemCard.qty;
                }
                this.qtyMax = qtyMax;

                if (this.qty > this.qtyMax) this.qty = this.qtyMax;
                if (this.qty < 1) this.qty = 1;
            },
            validityAddition(product , qty){
                this.updateQtyMax();
                if(product.ProductCharVariations.length){
                    const hasActiveVariation = product.ProductCharVariations.some(
                        (variation) => variation.status === 'ativo'
                    );
                    if (hasActiveVariation && this.getProductVariation == null) 
                        return this.SET_ALERT({ heading: 'erro', message: 'Selecione o campo de ' + product.ProductCharVariations[0].Characteristic.name });
                }
                this.addToCard({...product , qty})
            }
        },
        watch: {
            "qty" : function () {
                this.updateQtyMax();
            },
            '$store.state.product.product_variation':function () {
                this.updateQtyMax();
            },
        }
    }
</script>