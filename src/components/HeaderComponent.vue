<template>
    <header v-click-outside="closeSacola">
        <div class="h-[5.5em]"></div>
        <div class="relative">
            <div :class="{ 'shadow-md': isScrolled }" class="border-b transition-shadow fixed w-full bg-white top-0 z-[99]">
                <div class="__sides relative flex items-center justify-between h-[5.5em]">
                    <BurgerMenuIcon @event="handleMenuEvent" class="md:hidden"/>
                    <router-link class="text-2xl center-title font-bold text-gray-800 hover:text-gray-700 lg:text-3xl whitespace-nowrap" to="/page/1">{{ $store.state.helpers.storeName }}</router-link>
                    <nav class="space-x-3 lg:space-x-6 hidden md:flex text-center items-center">
                        <router-link v-for="link in mainLinks" :key="link.name" class="__link" :to="link.path" >{{link.name}}</router-link>
                    </nav>
                    <div class="flex items-center space-x-2 lg:space-x-6">
                        <router-link v-if="!$store.state.user.user" to="/auth" class="hidden __link md:block">Login</router-link>
                        <router-link v-else to="/profile/account" class="hidden __link md:block">Minha conta</router-link>
                        <!-- Barra de Pesquisa -->
                        <button @click="SET_SHOW_MODAL_SEARCH(!getShowModalSearch)" class="relative text-gray-700 hover:text-gray-600">
                            <svg class="fill-current text-gray-800 w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        </button>
                        <!-- Btn Sacola -->
                        <button @click="openSacola = !openSacola" class="relative text-gray-700 hover:text-gray-600">
                            <svg class="w-6 h-6 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="none"><g><rect fill="none" height="24" width="24"/><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"/></g></svg>
                            <span v-if="getCart.length > 0" class="absolute -top-1.5 left-3.5 px-1 text-[0.55rem] text-white bg-indigo-500 rounded-full " :class="{ 'animate-ping transition duration-1000 ease-in-out delay-700': getShowCartAnimation}">{{ getCart.length }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <Modal_Search v-show="getShowModalSearch" />
        </div>
        <!-- Drawer Sacola -->
        <div v-show="openSacola" class="relative">
          <CartDrawerComponent class="fixed top-0 right-96 z-50 h-screen transition-transform translate-x-full w-96 bg-white pt-[5.5em] shadow-2xl border border-gray-200" />
        </div>
        <!-- Fim Drawer Sacola -->

        <!-- Itens dentro do Burger -->
        <div class="md:hidden" :class="showThisCommponent ? 'block md:hidden' : 'hidden'">
            <div :class="isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'" class="bg-white fixed z-[98] transition-all duration-300 bottom-0 p-4 divide-y top-[5.5em] min-h-screen w-screen">
                <router-link v-for="link in mainLinks" :key="link.name" class="text-lg py-2 block" :to="link.path" >{{link.name}}</router-link>
                <router-link v-if="!$store.state.user.user" to="/auth" class="text-lg py-2 block">Login</router-link>
                <router-link v-else to="/profile/account" class="text-lg py-2 block">Minha conta</router-link>
            </div>
        </div>
        <!-- Fim dos itens dentro do Burger -->
    </header>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import ClickOutside from 'vue-click-outside';
    import CartDrawerComponent from '@/components/cart/CartDrawerComponent.vue';
    import ProfileButtonComponent from './header/ProfileButtonComponent.vue';
    import BurgerMenuIcon from '@/components/header/BurgerMenuIcon.vue';
    import Modal_Search from '@/components/search/Modal_Search.vue';

    export default {
        name: 'HeaderComponent',
        components: {
            ProfileButtonComponent,
            BurgerMenuIcon,
            CartDrawerComponent,
            Modal_Search
        },
        props: {
            noBorder: {
                Type: Boolean
            }
        },
        data() {
            return {
                keyword: '',
                openSacola: false,
                isMenuOpen: false,
                isScrolled: false,
                showThisCommponent: false,
                mainLinks: [
                    {
                        name: 'Home',
                        path: '/'
                    },
                    {
                        name: 'Loja',
                        path: '/page/1'
                    },
                    {
                        name: 'Acompanhar Pedido',
                        path: '/track_order'
                    },
                    {
                        name: 'Sobre',
                        path: '/about_us'
                    },
                    {
                        name: 'F.A.Q',
                        path: '/faq'
                    },
                    {
                        name: 'Contatos',
                        path: '/contact'
                    }
                ]
            }
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            ...mapMutations(['TOGGLE_MENU', 'SET_SHOW_MODAL_SEARCH']),
            closeSacola(){
                this.openSacola = false
            },
            handleMenuEvent(evt) {
                if(evt) {
                    this.showThisCommponent = evt
                    return;
                }
                this.isMenuOpen = false;
                setTimeout(() => {
                    this.showThisCommponent = false;
                }, 310);
            },
            updateIsMenuOpen(value) {
                if(value){
                    setTimeout(() => {
                        this.isMenuOpen = value;
                    }, 2);
                }
            },
            handleScroll() {
                this.isScrolled = window.scrollY > 0;
            }
        },
        watch: {
            showThisCommponent(value) {
                this.updateIsMenuOpen(value)
            }
        },
        computed: {
            ...mapGetters(['getCart', 'getShowCartAnimation', 'getShowModalSearch']),
        },
        directives: {
            ClickOutside
        }
    }
</script>

<style>
    @media screen and (max-width: 768px) {
        .center-title {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .__link {
        text-decoration: none;
        position: relative;
    }
    .__link::after {
        bottom: -4px;
        content: "";
        display: block;
        height: 2px;
        left: 0;
        position: absolute;
        background: rgb(31 41 55);
        opacity: 0.6;
        transition: width 0.3s ease 0s, opacity 0.3s ease 0s;
        width: 0;
    }
    .__link:hover::after {
        width: 100%;
        opacity: 0.9;
    }
</style>