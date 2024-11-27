<template>
    <!-- <main class="flex items-center gap-3"> -->
    <main class="w-full flex items-center">
        <fieldset v-if="characteristic.Characteristic.type == 'cor'" class="flex flex-wrap py-4 gap-3">
            <legend class="sr-only">Color</legend>
            <div :for="variation.id" v-for="variation in characteristic.variations" :key="variation.id" >
                <input type="radio" name="SelectedVariation" :id="variation.id" class="peer hidden" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" />
                <label :for="variation.id"
                :class="variation.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-transparent/50 cursor-not-allowed border-2 ' : 'cursor-pointer'"
                class="block h-8 w-8 rounded-full bg-black shadow-sm peer-checked:ring-1 peer-checked:ring-offset-2 peer-checked:ring-gray-400"
                :style="{ backgroundColor: variation.Variation.name }">

                <span class="sr-only"> {{ variation.Variation.description }} </span>
                </label>
            </div>
        </fieldset>
        <fieldset v-else-if="characteristic.Characteristic.type == 'sigla'" class="py-4">
            <div class="flex flex-wrap gap-1">
                <label :for="variation.id" v-for="variation in characteristic.variations" :key="variation.id">
                    <input type="radio" name="SelectedVariation" :id="variation.id" class="peer sr-only" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" />
                    <span :class="variation.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-gray-100' : 'cursor-pointer'" class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                    {{ variation.Variation.name }}
                    </span>
                </label>
            </div>
        </fieldset>
        <fieldset v-else-if="characteristic.Characteristic.type == 'texto'" class="py-4">
            <div class="flex select-none flex-wrap items-center gap-1 text-xs ">
                <label :for="variation.id" v-for="variation in characteristic.variations" :key="variation.id">
                    <input type="radio" name="SelectedVariation" :id="variation.id" class="peer sr-only" :disabled="variation.quantity <= 0" v-model="selectedVariationId" :value="variation.id" />
                    <p :for="variation.id" :class="variation.quantity <= 0 ? 'peer-checked:bg-black text-gray-400 bg-gray-100' : 'cursor-pointer'" class="peer-checked:bg-black peer-checked:text-white rounded-sm border px-4 py-2 font-semibold">
                        {{ variation.Variation.name }}
                    </p>
                </label>
            </div>
        </fieldset>
        <div v-if="getProductVariation() && getProductVariation().quantity <= 10" class="rounded ml-4 text-xs font-semibold bg-yellow-100 border py-1 px-3">
            <p class="text-red-500 animate-pulse">
                Últimos {{ getProductVariation().quantity }} itens
            </p>
        </div>
    </main>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'VariationsComponent',
        data() {
            return {
                selectedVariationId: null
            }
        },
        props: {
            characteristic: {
                type: Object,
                required: true
            }
        },
        methods: {
          ...mapGetters(['getProductVariation']),
          ...mapMutations(['SET_PRODUCT_VARIATION']),
        },
        watch: {
            selectedVariationId(newId) {
                // Verificar se o novo ID de variação é válido e executar a ação SET_PRODUCT_VARIATION
                if (newId !== null) {
                    const variation = this.characteristic.variations.find((v) => v.id === newId);
                    if (variation) {
                        this.SET_PRODUCT_VARIATION({ ...variation });
                    }
                }
            }
        },
    }
</script>