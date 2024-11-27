<template>
    <div>
        <HeaderComponent />
        <div class="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-2">
            <div class="lg:h-[70vh] bg-center lg:bg-bottom bg-no-repeat bg-fixed bg-cover col-span-2" :style="{ 'background-image': 'url(' + backgroundImage + ')' }"></div>
            <div class="bg-black flex items-center justify-center min-h-[50vh] px-8">
                <div class="text-white text-center space-y-6 py-14">
                    <span class="uppercase tracking-wider text-sm">Começe Agora</span>
                    <h1 class="font-playfair font-bold text-5xl">{{$store.state.helpers.storeName}}</h1>
                    <p class="w-2/3 mx-auto text-justify">Prepare-se para liderar a revolução digital e destacar-se da concorrência. Com este projeto de e-commerce, você está pronto para conquistar o mundo online.</p>
                    <div class="pt-6">
                        <router-link to="/page/1" class="rounded-full bg-white cursor-pointer text-black px-8 py-4 text-sm">Acessar agora</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="__sides text-center py-14">
            <h1 class="tracking-widest md:text-4xl font-playfair">Bem vindo ao {{ $store.state.helpers.storeName }}</h1>
            <p class="py-6 md:text-2xl max-w-4xl mx-auto text-justify">Com uma abordagem centrada no usuário e um toque de inovação, transformei ideias em realidade digital. Do backend ao frontend, cada detalhe foi projetado para proporcionar uma experiência excepcional, desde a navegação intuitiva até as transações seguras.</p>
        </div>
        <div class="space-y-3 border-t pt-10">
            <div class="__sides mb-6">
                <div class="px-2 text-center lg:text-left">
                    <h1 class="font-playfair mb-1 text-4xl tracking-wider">Novidades da Semana</h1>
                    <p class="">Explore as tendências mais recentes da semana!</p>
                </div>
            </div>
            <div class="lg:hidden mx-auto">
                <carousel :infinite="true" :autoplayTimeout="5000" :speed="2000" :indicator="false" :perPage="1" autoplay>
                    <!-- Produtos -->
                    <slide v-for="product in getProducts.slice(0, 5)" :key="product._id">
                        <div class="px-2">
                            <SingleProductComponent :can-add-to-liked="false" class="mx-auto md:mx-0" :product="product" />
                        </div>
                    </slide>
                </carousel>
            </div>
            <div class="hidden lg:block mx-auto __sides">
                <carousel :autoplayTimeout="5000" :speed="2000" :indicator="false" :perPage="4" autoplay>
                    <slide v-for="product in getProducts" :key="product._id">
                        <div class="px-2">
                            <SingleProductComponent :can-add-to-liked="false" class="mx-auto md:mx-0" :product="product" />
                        </div>
                    </slide>
                </carousel>
            </div>
        </div>
        <div class="lg:h-[45vh] h-[30vh] bg-center flex items-center justify-center mt-4 lg:bg-top bg-no-repeat bg-fixed bg-cover" :style="{ 'background-image': 'url(' + backgroundImageSecund + ')' }">
            <h1 class="__text_effect font-playfair text-center text-6xl lg:text-[6rem] leading-[1.4em]">Eleve sua Experiência de Venda</h1>
        </div>
        <div class="__sides py-20">
            <div>
                <h1 class="font-bold text-3xl">Últimas Notíticas</h1>
                <div class="flex items-center mb-6 justify-between">
                    <h1>Mantenha-se informado com as últimas notícias sobre {{$store.state.helpers.storeName}}</h1>
                    <!-- <p class="underline">Visualizar todas</p> -->
                </div>
            </div>
            <div class="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
                <!-- Noticias -->
                <div class="space-y-4" v-for="(item, index) in latestNews" :key="index">
                    <div class="h-[20em] bg-no-repeat bg-cover bg-center" :style="{ 'background-image': 'url(' + item.image + ')' }">
                    </div>
                    <p class="uppercase font-playfair text-xs font-bold">{{item.date}}</p>
                    <h1 class="font-bold font-playfair text-2xl">{{item.title}}</h1>
                    <p>{{item.summary}}</p>
                    <!-- <p class="underline cursor-pointer">Leia mais</p> -->
                </div>
            </div>
        </div>
        <!-- <div class="relative font-playfair border-t border-gray-200 lg:py-16">
            <h1 class="font-bold tracking-widest uppercase mt-4 text-gray-800 text-center">Citação na Imprensa</h1>
            <carousel :infinite="true" :autoplayTimeout="5000" :speed="2000" :indicator="false" :perPage="1" autoplay class="container mx-auto">
                <slide v-for="item in quotes" :key="item">
                    <p class="text-center text-xl px-20 lg:text-5xl pt-4 lg:max-w-6xl mx-auto text-gray-800">"{{ item }}"</p>
                </slide>
            </carousel>
            <div class="w-full h-10 lg:h-24 absolute bg-[#fff7ea] bottom-0" />
        </div> -->
        <!-- <div class="bg-[#fff7ea] flex flex-col -mt-10 items-center text-red-500 justify-center px-10 min-h-[18em]">
            <h1 class="font-bold text-3xl uppercase tracking-widest">Newsletter</h1>
            <p class="text-lg mt-2 mb-10">Sign up for our newsletter and receive 10% off your first order!</p>
            <form class="mx-auto max-w-[500px] text-red-500 w-full flex items-center border group-hover:border-gray-400 transition ease-in-out duration-200">
                <input type="text" class="py-3 placeholder-red-400 px-4 w-full bg-transparent focus:outline-none" placeholder="Email">
                <button class="pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button>
            </form>
        </div> -->
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside';
    import { mapActions, mapGetters } from 'vuex';
    import HeaderComponent from '../components/HeaderComponent.vue';
    import PaginationComponent from '../components/helper/PaginationComponent.vue';
    import SingleProductComponent from '../components/product/SingleProductComponent.vue';
    import SingleProductSkeleton from '../components/skeleton/SingleProductSkeleton.vue'
    import AnnouncementComponent from '../components/AnnouncementComponent.vue';

    export default {
        name: 'Home',
        components: {
            HeaderComponent,
            PaginationComponent,
            SingleProductComponent,
            SingleProductSkeleton,
            AnnouncementComponent
        },
    data() {
        return {
            openMenu: false,
            buttonText: 'Sort by latest',
            backgroundImage: 'img/bg-home.jpg',
            backgroundImageSecund: 'img/bg-home-2.jpg',
            // backgroundImage: 'https://images.unsplash.com/photo-1542871793-fd7e2b3cd0b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=904&q=80',
            quotes: [
                "Eleve seu estilo a novos patamares com uma coleção selecionada de roupas modernas que chamam a atenção.",
                "Descubra as últimas tendências da moda e faça uma declaração com opções de roupas elegantes para cada ocasião.",
                "Fique à frente da moda com uma seleção cuidadosamente selecionada de roupas modernas e acessíveis.",
                "Faça uma declaração de moda ousada com peças de roupas chiques e elegantes que elevam seu guarda-roupa.",
                "Intensifique seu jogo de moda com uma linha exclusiva de roupas elegantes e modernas que se destacam da multidão.",
                "Chame a atenção com opções de roupas da moda e da moda, projetadas para fazer você parecer e se sentir melhor.",
                "Do casual ao elegante, encontre seu estilo perfeito com uma coleção de roupas elegantes escolhidas a dedo por seus designs modernos.",
                "Liberte o seu fashionista interior com opções de roupas elegantes e acessíveis, criadas para garantir que você tenha a melhor aparência.",
                "Encontre sua nova roupa favorita em uma coleção selecionada de roupas elegantes e modernas que adicionam um toque de elegância ao seu guarda-roupa.",
                "Mantenha-se na moda e elegante com uma seleção cuidadosamente selecionada de roupas modernas que fazem uma declaração de moda ousada."
            ],
            latestNews: [
                {
                    image: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
                    date: "Março 1, 2024",
                    title: "As últimas tendências da moda feminina para 2024",
                    summary: "Prepare-se para os mais novos estilos e cores da moda feminina para o próximo ano. De padrões arrojados a cores brilhantes, 2024 tem tudo a ver com fazer uma declaração."
                },
                {
                    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
                    date: "Março 15, 2024",
                    title: "Itens indispensáveis ​​da moda feminina de inverno",
                    summary: "Mantenha-se aquecido e elegante neste inverno com nossas principais opções de moda masculina. De suéteres aconchegantes a jaquetas funcionais, esses itens essenciais manterão você com boa aparência durante toda a estação."
                },
                {
                    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
                    date: "Março 21, 2024",
                    title: "As melhores tendências de acessórios para 2024",
                    summary: "Os acessórios são a maneira perfeita de elevar seu visual e fazer uma declaração. De brincos marcantes a bolsas ousadas, aqui estão as principais tendências de acessórios que você precisa conhecer para 2024."
                }
            ]
        }
    },
    methods: {
        ...mapActions(['fetchProducts']),
        closeMenu(){
            this.openMenu = false
        }
    },
   
    created(){
        this.fetchProducts({keyword: ''});
    },
    computed: {
        ...mapGetters(['getProducts']),
    },
    directives: {
        ClickOutside
    }
}
</script>

<style lang="scss">
    .__text_effect {
        color: transparent;
        -webkit-text-stroke: 1px #fff;
        color: #ffffff00; 
        user-select: none;
    }
</style>