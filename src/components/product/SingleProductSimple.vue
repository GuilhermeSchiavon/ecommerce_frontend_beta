<template>
     <router-link :to="`/product/${product.id}`" class="flex group">
        <img v-if="!imageError && product.Images.length > 0" :src="imageUrl(product.Images[0].filename)" @error="imageError= true"  alt="" class="h-24 w-24 rounded-sm transform object-cover object-center transition duration-200 ease-in-out group-hover:scale-105">
        <svg v-else class="h-12 w-24 rounded-sm transform object-cover object-center transition duration-200 ease-in-out group-hover:scale-105" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>
        <div class="relative flex flex-1 ml-2 flex-col justify-between">
            <div class="col-gap-5 grid">
                <h1 class="text-base font-semibold text-blue-900" :title="product.description">{{product.name}}</h1>
                <!-- <p class="mx-0 mt-1 mb-0 text-xs text-gray-400">
                    {{ product.brand }}
                </p> -->
                <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                    <dt class="inline">Quantidade:</dt>
                    <dd class="inline"> {{ product.qty }} </dd>
                    </div>

                    <div v-if="product.variationSelected">
                        <dt class="inline">{{ product.variationSelected.Characteristic.name }}:</dt>
                        <dd class="inline"> {{ product.variationSelected.Variation.name }} </dd>
                    </div>
                    <section v-if="product.discount" class="mt-2 space-y-px text-sm text-gray-400 leading-3">
                        <dd class="inline text-[10px] line-through">{{$store.state.helpers.currency}} {{ (product.price).toFixed(2).replace(".", ",") }}</dd>
                        <div class="flex products-center text-xs ">
                            <dd class="inline  font-bold">{{$store.state.helpers.currency}} {{ (product.price - (product.price * product.discount / 100)).toString().split('.')[0] }}</dd>
                            <dd class="text-[10px] font-light pl-0.5 mt-0.5 text-end">,{{ (product.price - (product.price * product.discount / 100)).toFixed(2).toString().split('.')[1]  }}</dd>
                            <div class="text-[10px] text-white ml-2 bg-red-600/70 px-1">-{{product.discount.toFixed(0)}}%</div>
                        </div>
                    </section>
                    <section v-else class="flex products-center text-xs text-gray-400">
                        <dd class="inline font-bold">{{$store.state.helpers.currency}} {{ product.price.toString().split('.')[0] }}</dd>
                        <dd class="text-[10px] font-light pl-0.5 mt-0.5 text-end">,{{ product.price.toString().split('.')[1]  }}</dd>
                    </section>
                </dl>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'SingleProduct',
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                imageError: false
            }
        },
        methods: {
            imageUrl(image){
                return `${process.env.VUE_APP_URL_SERVER}/uploads/products/${image}`
            },
        }
    }
</script>