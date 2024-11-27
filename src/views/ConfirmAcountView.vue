<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />

        <main class="flex-grow flex items-center justify-center ">
            <div class="w-full mb-40 max-w-lg mx-auto overflow-hidden bg-white rounded-lg border border-gray-100">
                <div class="px-6 py-4">
                    <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Validação do Usuário</h3>
                    <p class="text-sm font-thin py-2 text-center text-gray-600 dark:text-gray-200">Por favor, aguarde enquanto validamos suas informações.</p>
                    <div v-if="!$store.state.user.userLoading">
                        <SpinnerComponent class="m-auto" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    import SpinnerComponent from '../components/helper/SpinnerComponent.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'ConfirmAcountView',
        components: {
            HeaderComponent,
            SpinnerComponent
        },
        data() {
            return {
                
            }
        },
        methods: {
            ...mapMutations(['SET_ALERT']),
            ...mapActions(['confirmUser']),

            submitConfirmation(){
                if (!this.$route.params.token) {
                    this.SET_ALERT({ heading: 'error', message: 'Token Inválido' })
                    return;
                } else {
                    this.confirmUser({
                        token: this.$route.params.token,
                    })
                }
            }
        },
        mounted() {
            this.submitConfirmation();
        },
        computed: {
            ...mapGetters(['getLoadingUser'])
        }
    }
</script>