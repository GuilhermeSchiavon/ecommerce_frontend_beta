<template>
    <div class="__home min-h-screen relative flex flex-col" ref="productsContainer">
        <HeaderComponent />
        <div class="text-white bg-center h-[22rem] relative" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
            <div class="absolute w-full h-full bg-black opacity-60"></div>
            <div class="absolute z-20 w-full h-full px-8 flex items-center justify-center flex-col text-center">
                <h1 v-if="$route.params.category" class="text-5xl font-bold font-playfair mb-4 z-10">{{ $route.params.category }}</h1>
                <h1 v-else class="text-5xl font-bold font-playfair mb-4 z-10">Nossos Produtos</h1>
                <p>Compre agora, não deixe para depois. Explore nossas principais marcas<br> e estilos à venda.</p>
            </div>
        </div>
        <div class="sm:mt-2 flex flex-col">
            <div class="py-2 sm:__sides">
                <div class="mx-auto max-w-md md:container flex items-center">
                    <form class="relative flex w-full sm:w-80 items-center">
                        <svg class="absolute left-2 block h-5 w-5 text-gray-700 font-semibold " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" class=""></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
                        </svg>
                        <input v-model="$route.params.search" @input="onSearch"  @keydown.enter.prevent @keyup.enter="carregarProduct" type="name" name="search" class="block p-2 pl-10 w-36 sm:w-80 text-xs text-gray-700 font-semibold bg-transparent focus:outline-none placeholder:text-gray-500 " placeholder="Pesquisar" />
                    </form>
                    <div class="flex px-2 md:px-0 items-center ml-auto">
                        <button @click="openMenu = !openMenu" v-click-outside="closeMenu" type="button" class="py-2 text-gray-700 font-semibold capitalize transition-colors duration-200 transform text-xs whitespace-nowrap">{{ buttonText }}</button>
                        <div v-if="openMenu" class="relative">
                            <div class="absolute right-0 z-20 w-48 mt-3 border overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700 whitespace-nowrap">
                                <button @click="buttonText = 'Mais recentes'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Mais recentes</button>
                                <button @click="buttonText = 'Melhores avaliações'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Melhores avaliações</button>
                                <button @click="buttonText = 'Menor preço'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Menor preço</button>
                                <button @click="buttonText = 'Maior preço'" class="block w-full capitalize px-4 py-2 text-xs text-gray-600 border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600">Maior preço</button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="flex-grow mx-auto container px-2 pb-2" ref="scrollComponent">
                <div v-if="!$store.state.product.productLoading" class="grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <main v-if="!getProducts || getProducts.length == 0" class="text-2xl font-bold m-auto text-gray-500 col-span-2 lg:col-span-3 xl:col-span-4">
                        <td class="whitespace-no-wrap py-12 text-center text-gray-500">    
                            Nenhum produto encontrado
                            <p class="text-sm font-thin py-2">Experimente utilizar diferentes filtros para a sua pesquisa..</p>
                        </td>
                    </main>
                    <SingleProductComponent v-for="product in getProducts" :product="product" :key="product.id"/>
                </div>   
                <div v-else class="grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SingleProductSkeleton v-for="(product, index) in 12" :key="index"/>
                </div>   
                <div v-if="$store.state.product.loadingMoreProducts" class="grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <SingleProductSkeleton v-for="(product, index) in 12" :key="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside';
    import { mapActions, mapGetters } from 'vuex';
    import HeaderComponent from '../components/HeaderComponent.vue';
    import SingleProductComponent from '../components/product/SingleProductComponent.vue';
    import SingleProductSkeleton from '../components/skeleton/SingleProductSkeleton.vue';
    import { debounce } from 'lodash';

    export default {
        name: 'Products',
        components: {
            HeaderComponent,
            SingleProductComponent,
            SingleProductSkeleton
        },
        data() {
            return {
                page: 1,
                openMenu: false,
                buttonText: 'Mais recentes',
                backgroundImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll)
        },
        methods: {
            ...mapActions(['fetchProducts', 'fetchMoreProducts']),
        
            carregarProduct(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: 0, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
            debouncedSearch: debounce(function() {
                this.page = 1;
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: 0, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            }, 1200),
            onSearch() {
                this.debouncedSearch();
            },
            handleScroll() {
                if(this.$store.state.product.page < this.$store.state.product.pages){
                    let element = this.$refs.scrollComponent
                    if (element.getBoundingClientRect().bottom < (window.innerHeight + 2)) {
                        if(!this.$store.state.product.loadingMoreProducts){
                            this.$store.dispatch('fetchMoreProducts', { keyword: this.$route.params.search, pageNumber: (this.$store.state.product.page + 1), category: this.$route.params.category, tag: this.$route.params.tag, sortBy:  this.buttonText});
                        }
                    }
                }
            },
            closeMenu(){
                this.openMenu = false
            },
        },
        watch: {
            '$route.params.pageNumber': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
            '$route.params.search': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
            '$route.params.category': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
            '$route.params.tag': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
            'buttonText': function(){
                this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
            },
        },
        created(){
            this.fetchProducts({keyword: this.$route.params.search, pageNumber: this.$route.params.pageNumber, category: this.$route.params.category, tag: this.$route.params.tag, sortBy: this.buttonText});
        },
        computed: {
            ...mapGetters(['getProducts']),
        },
        directives: {
            ClickOutside
        }
    }
</script>