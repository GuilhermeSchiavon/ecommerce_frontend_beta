<template>
    <div class="flex flex-col">
        <main class="flex-grow flex flex-col">
            <EmptyCartComponent class="h-full flex-grow" v-if="getCart().length === 0" />
            <div v-else class="container h-[90vh] flex flex-col">
                <CartItemsComponent :items="cartItems" class="h-full w-full overflow-y-auto py-4 px-6 m-0"/>
                <div class="items-end bottom-0 p-4">
                    <div class="flex justify-center border-t border-gray-100 py-1">
                        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF7F7F"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <p class="text-sm font-medium text-indigo-900">Salvar produtos como Favoritos</p>
                    </div>                    
                    <TotalSummaryComponent @event="proceedToCheckout" title="Cart" class="flex items-end button-0" submit="Proceed to checkout"/>
                </div>                    
            </div>
        </main>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import CartItemsComponent from './CartItemsComponent.vue';
    import EmptyCartComponent from './EmptyCartComponent.vue';
    import TotalSummaryComponent from '../TotalSummaryComponent.vue';
    export default {
        name: 'CartComponent',
        components: {
                CartItemsComponent,
                TotalSummaryComponent,
                EmptyCartComponent
        },
        data() {
            return {
                headerItems: ['Image', 'Product', 'Price', 'Quantity', 'Subtotal'],
                cartItems: []
            }
        },
        methods: {
            ...mapGetters(['getCart']),
            ...mapMutations(['REDIRECT']),
            proceedToCheckout(){
                if(this.$store.state.helpers.authenticateBeforeCheckout && !this.$store.state.user.user){
                    this.REDIRECT('/checkout');
                    this.$router.push('/auth?redirect=checkout');
                } else this.$router.push('/checkout');
            },
            applyCoupon(){
              // ..  
            }
        },
        watch: {
            '$store.state.product.cart': function(){
                this.cartItems = this.getCart();
            }
        },
        created(){
            this.cartItems = this.getCart();
        }
    }
</script>

<style lang="scss" scoped>
      /* SCROLLBAR */
      ::-webkit-scrollbar { /* width */
    width: 6px;
    }
    ::-webkit-scrollbar-track { /* Track */
    background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb { /* Handle */
    background: #888;
    }
    ::-webkit-scrollbar-thumb:hover { /* Handle on hover */
    background: #555;
    }
    /* FIM SCROLLBAR */
</style>