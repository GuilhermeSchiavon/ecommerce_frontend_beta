<template>
  <div class="mx-auto max-w-screen-xl px-2 ">
    <ul class="space-y-4">
        <li v-for="(item, index) in items" :key="index" class="flex items-center justify-start gap-5">
            <img v-if="imageLoaded[index+'_'+item.id] != false && item.Images.length > 0" :src="imageUrl(item.Images[0].filename)" @error="handleImageError(index+'_'+item.id)" alt="" class="w-32 h-32 rounded-sm object-cover">
            <svg v-else class="w-32 h-32 rounded-sm object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>
            <div>
                <router-link :to="`/product/${item.id}`" class="text-md text-gray-900 font-bold text-ellipsis overflow-hidden">{{ item.name }}</router-link>
                <section v-if="item.discount" class="mt-2 space-y-px text-sm text-gray-600 leading-3">
                    <dd class="inline line-through">{{$store.state.helpers.currency}} {{ (item.price).toFixed(2).replace(".", ",") }}</dd>
                    <div class="flex items-center">
                        <dd class="inline text-lg font-bold">{{$store.state.helpers.currency}} {{ (item.price - (item.price * item.discount / 100)).toString().split('.')[0] }}</dd>
                        <dd class="font-light pl-0.5 mt-0.5 text-end">,{{ (item.price - (item.price * item.discount / 100)).toFixed(2).toString().split('.')[1]  }}</dd>
                        <div class="text-xs text-white ml-2 bg-red-600 py-0.5 px-1">-{{item.discount.toFixed(0)}}%</div>
                    </div>
                </section>
                <section v-else class="flex items-center">
                    <dd class="inline text-lg font-bold">{{$store.state.helpers.currency}} {{ item.price.toString().split('.')[0] }}</dd>
                    <dd class="font-light pl-0.5 mt-0.5 text-end">,{{ item.price.toString().split('.')[1]  }}</dd>
                </section>
                <section v-if="item.variationSelected" class="mt-1">
                    <fieldset v-if="item.variationSelected.Characteristic.type == 'cor'" class="flex flex-wrap gap-3">
                        <legend class="sr-only">Color</legend>
                        <div>
                            <!-- <input type="radio" name="SelectedVariation" :id="variation.id" class="peer hidden" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" /> -->
                            <label :for="item.variationSelected.id"
                                :class="item.variationSelected.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-transparent/50 cursor-not-allowed border-2 ' : 'cursor-pointer'"
                                class="block h-8 w-8 rounded-full bg-black shadow-sm peer-checked:ring-1 peer-checked:ring-offset-2 peer-checked:ring-gray-400"
                                :style="{ backgroundColor: item.variationSelected.Variation.name }">
                            <span class="sr-only"> {{ item.variationSelected.Variation.description }} </span>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset v-else-if="item.variationSelected.Characteristic.type == 'sigla'">
                        <div class="flex flex-wrap gap-1">
                            <label>
                                <!-- <input type="radio" name="SelectedVariation" :id="variation.id" class="peer sr-only" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" /> -->
                                <span :class="item.variationSelected.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-gray-100' : 'cursor-pointer'" class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                                {{ item.variationSelected.Variation.name }}
                                </span>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset v-else-if="item.variationSelected.Characteristic.type == 'texto'">
                        <div class="flex select-none flex-wrap items-center gap-1 text-xs ">
                            <label>
                                <!-- <input type="radio" name="SelectedVariation" :id="variation.id" class="peer sr-only" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" /> -->
                                <p :for="item.variationSelected.id" :class="item.variationSelected.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-gray-100' : 'cursor-pointer'" class="peer-checked:bg-black peer-checked:text-white rounded-sm border px-4 py-2 font-semibold">
                                    {{ item.variationSelected.Variation.name }}
                                </p>
                            </label>
                        </div>
                    </fieldset>
                </section>
                <div class="flex flex-1 items-center justify-end gap-2 rounded-sm mt-1">
                    <label for="Line1Qty" class="sr-only"> Quantity </label>

                    <div>
                        <label for="Quantity" class="sr-only"> Quantity </label>
                        <div class="flex items-center border border-gray-200 rounded">
                            <button @click="DECREASE_QUANTITY(item)" type="button" class="w-6 h-4 mb-2.5 text-gray-600 transition hover:opacity-75">
                                &minus;
                            </button>
                            <input @change="setQtyItemToCard({...item, qty: Number(item.qty)})" v-model="item.qty" type="number" id="Quantity" value="1" class="h-8 w-6 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none" />
                            <button @click="setQtyItemToCard({...item, qty: Number((1))})" type="button" class="w-6 h-4 mb-2.5 text-gray-600 transition hover:opacity-75">
                                &plus;
                            </button>
                        </div>
                    </div>
                    <button @click="REMOVE_FROM_CART(item)" class="text-blue-800 text-xs ml-4 transition hover:text-red-600">
                        Excluir
                    </button>
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'
    export default {
        name: 'CartItems',
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                imageLoaded: []
            }
        },
        methods: {
            ...mapActions(['setQtyItemToCard']),
            ...mapMutations(['REMOVE_FROM_LIKED', 'REMOVE_FROM_CART', 'ADD_TO_LIKED', 'DECREASE_QUANTITY']),

            imageUrl(image){
                return `${process.env.VUE_APP_URL_SERVER}/uploads/products/${image}`
            },
            handleImageError(index) {
                this.imageLoaded[index] = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    ._cart{
        img {
            width: 100;
            max-height: 12em;
        }
    }

    @media only screen and (min-width: 622px){
        .__cart{
            .item__area {
                display: grid;
                grid-template-columns: 50px 1fr 2fr 1fr 1fr 1fr;
            }
        }
    }

    @media only screen and (min-width: 1024px){
        ._cart{
            img {
                height: 90px;
            }
        }
    }
</style>