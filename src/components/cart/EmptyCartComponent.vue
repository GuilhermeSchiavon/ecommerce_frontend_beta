<template>
    <div class="w-full p-6 justify-center flex items-center">
        <div class="w-full space-y-16">
            <div>
                <h1 class="text-gray-700 text-4xl text-center mb-4">Seu carrinho de compras está vazio.</h1>
                <p class="text-gray-400 text-lg text-center">Dê um propósito a ele continue suas compras na {{ $store.state.helpers.storeName }}.com.br</p>
            </div>
            <div>
     
            </div>
            <div class="flex items-center justify-center">
                <router-link to="/page/1" style="max-width: 14em" class="flex items-center justify-center w-full px-6 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="whitesmoke"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"/></svg>
                    <span class="ml-3 text-sm font-semibold text-gray-200">Voltar para a loja</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EmptyCart',
    }
</script>

<style lang="scss" scoped>

</style>