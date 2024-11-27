<template>
    <main>
        <div v-if="product.quantity <= 0" class="max-w-sm opacity-30">
            <div class="w-full relative h-60 md:h-96 bg-gray-300 bg-center bg-cover" :style="`background-image: url('${imageUrl}')`"></div>
            <div class="w-full h-[4.5rem]">
                <div class="relative w-full h-full">
                    <div @click.self="$router.push(`/product/${product.id}`)" class="absolute bg-white flex flex-col space-y-1 pt-3 z-10 w-full h-full">
                        <h3 class="font-semibold text-xs text-gray-900 uppercase">{{product.name}}</h3>
                        <section v-if="product.discount" class="leading-3">
                            <dd class="inline line-through text-[10px] text-gray-500 uppercase">{{$store.state.helpers.currency}} {{product.price}}</dd>
                            <div class="flex items-center">
                                <h3 class="text-xs font-bold text-gray-500 uppercase">{{$store.state.helpers.currency}} {{ (product.price - (product.price * product.discount / 100)).toFixed(2).replace(".", ",") }}</h3>
                                <div class="text-[10px] text-white ml-2 bg-red-600 py-0.5 px-1 rounded-sm">-{{product.discount.toFixed(0)}}%</div>
                            </div>
                        </section>
                        <section v-else class="flex items-center">
                            <h3 class="text-xs font-bold text-gray-500 uppercase">{{$store.state.helpers.currency}} {{product.price}}</h3>
                        </section>
                    </div>
                    <div :style="hover && { 'transform': 'translateY(-4rem)'} " class="hidden md:flex h-16 ease-in-out duration-300 w-full items-center absolute justify-center px-1">
                        <button @click.self="addToCard({...product, qty: 1})" class="bg-gray-800 text-sm rounded-sm font-semibold text-gray-50 w-full p-4">Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else @mouseover="hover = true" @mouseleave="hover = false" :class="{'opacity-50': product.quantity <= 0}" class="cursor-pointer max-w-sm">
            <div @click.self="$router.push(`/product/${product.id}`)" class="w-full relative h-60 md:h-96 bg-gray-300 bg-center bg-cover" :style="`background-image: url('${imageUrl}')`">
                <div class="absolute top-2 space-y-2 right-2">
                    <div v-if="canAddToLiked">
                        <button @click="REMOVE_FROM_LIKED(product)" v-if="isAvilable(product.id, 'liked')" class="h-7 w-7 rounded-full flex hover:shadow-md transition duration-400 ease-in-out items-center bg-gray-50 justify-center">
                            <svg  xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="#FF7F7F"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                        <button @click.prevent="ADD_TO_LIKED({...product, qty: 1})" v-else class="h-7 w-7 rounded-full hover:shadow-md transition duration-400 ease-in-out flex items-center bg-gray-50 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-800" height="22px" viewBox="0 0 24 24" width="22px" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full h-[4.5rem]">
                <div class="relative w-full h-full">
                    <div @click.self="$router.push(`/product/${product.id}`)" class="absolute bg-white flex flex-col space-y-1 pt-3 z-10 w-full h-full">
                        <h3 class="font-semibold text-xs text-gray-900 uppercase">{{product.name}}</h3>
                        <div class="flex items-center justify-between">
                            <section v-if="product.discount" class="leading-3">
                                <dd class="inline line-through text-[10px] text-gray-500 uppercase">{{$store.state.helpers.currency}} {{product.price}}</dd>
                                <div class="flex items-center">
                                    <h3 class="text-xs font-bold text-gray-500 uppercase">{{$store.state.helpers.currency}} {{ (product.price - (product.price * product.discount / 100)).toFixed(2).replace(".", ",") }}</h3>
                                    <div class="text-[10px] text-white ml-2 bg-red-600 py-0.5 px-1 rounded-sm">-{{product.discount.toFixed(0)}}%</div>
                                </div>
                            </section>
                            <section v-else class="flex items-center">
                                <h3 class="text-xs font-bold text-gray-500 uppercase">{{$store.state.helpers.currency}} {{product.price}}</h3>
                            </section>
                            <p v-if="product.quantity < 10" class="text-xs font-bold text-red-500">
                                Restam apenas {{ product.quantity }}
                            </p>
                        </div>
                    </div>
                    <div :style="hover && { 'transform': 'translateY(-4rem)'} " class="hidden md:flex h-16 ease-in-out duration-300 w-full items-center absolute justify-center px-1">
                        <button @click.self="validityAddition(product, 1)" class="bg-gray-800 text-sm rounded-sm font-semibold text-gray-50 w-full p-4">Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    export default {
        name: 'SingleProduct',
        props: {
            product: {
                type: Object,
                required: true
            },
            canAddToLiked: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                hover: false
            }
        },
        computed: {
            ...mapGetters(['getLiked']),
            imageUrl() {
                if (this.product.Images.length > 0) {
                    return `${process.env.VUE_APP_URL_SERVER}/uploads/products/${this.product.Images[0].filename}`
                } else {
                    return '';
                }
            }
        },
        methods: {
            ...mapActions(['addToCard']),
            ...mapMutations(['ADD_TO_LIKED', 'REMOVE_FROM_LIKED']),
            isAvilable(id, type){
                if(type === 'liked'){
                    return this.getLiked.find(x => x.id === id) ? true : false;
                }
            },
            validityAddition(product , qty){
                if(product.ProductCharVariations.length){
                    const hasActiveVariation = product.ProductCharVariations.some(
                        (variation) => variation.status === 'ativo'
                    );
                    if (hasActiveVariation) return this.$router.push(`/product/${product.id}`)
                }
                this.addToCard({...product , qty})
            }
        }
    }
</script>