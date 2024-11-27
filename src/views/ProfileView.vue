<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex flex-col py-8">
            <div v-if="$store.state.user.loadingUser">
                <SpinnerComponent class="m-auto" />
            </div>
            <section v-else class="max-w-4xl w-full px-6 mx-auto bg-white">
                <div class="flex items-center justify-end">
                    <button v-if="$store.state.user.user" @click="LOG_USER_OUT()" class="font-medium text-gray-600 bg-gray-100 px-6 rounded-sm text-xs py-2 border hover:bg-gray-300">Sair</button>
                </div>
                <div class="relative mx-auto w-36 rounded-full">
                    <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                    <!-- <img class="mx-auto h-auto w-full rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" /> -->
                    <div class="rounded-full h-36 w-36 bg-blue-400 flex items-center justify-center">
                    <span class="text-white text-4xl">
                        {{ getUser().firstName.charAt(0) }}{{ getUser().lastName.charAt(0) }}
                    </span>
                    </div>
                </div>
                <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900">{{getUser().firstName + ' ' +  getUser().lastName}}</h1>
                <h3 class="font-lg text-semibold text-center leading-6 text-gray-600">{{ getUser().email }}</h3>

                <ul class="mt-3 divide-y rounded border py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li class="flex items-center py-3 text-sm">
                        <span>Status da Conta</span>
                        <span class="ml-auto">
                            <span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700 capitalize">
                                {{ getUser().accountStatus }}
                            </span>
                        </span>
                    </li>
                    <li class="flex items-center py-3 text-sm">
                        <span>Juntou-se</span>
                        <span class="ml-auto">{{ new Date(getUser().createdAt).toLocaleString("pt-BR") }}</span>
                    </li>
                </ul>
                <h2 class="mt-10 text-lg font-semibold text-gray-700 capitalize">Informação do Perfil</h2>
                <form class="border-b pb-8 mb-12">
                    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label class="labelStyle" for="name">Primeiro Nome</label>
                            <input v-model="newUser.firstName" type="text" class="inputStyle">
                        </div>
                        <div>
                            <label class="labelStyle" for="name">Sobrenome</label>
                            <input v-model="newUser.lastName" type="text" class="inputStyle">
                        </div>
                        <div>
                            <label class="labelStyle" for="phone number">Celular</label>
                            <input v-model="newUser.phone" type="text" class="inputStyle" maxlength="15">
                        </div>
                    </div>
                    <div v-if="canUpdate" class="flex justify-end mt-6 space-x-2">
                        <button @click="submitUpdate" type="button" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-sm">Atualizar</button>
                        <button @click=" cancelarUpdate()" type="button" class="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gray-100 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 border rounded-sm">Cancelar</button>
                    </div>
                </form>

                <AddressComponent />
                
            </section>
        </main>    
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import SpinnerComponent from '../components/helper/SpinnerComponent.vue'
    import AddressComponent from '../components/address/AddressComponent.vue'
    export default {
        name: 'Profile',
        components: {
            HeaderComponent,
            SpinnerComponent,
            AddressComponent
        },
        data() {
            return {
                user:{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                },
                newUser:{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                },
            }
        },
        methods: {
            ...mapMutations(['LOG_USER_OUT']),
            ...mapActions(['fetchUser', 'updateUser']),
            ...mapGetters(['getUser']),
            updateInformation() {
                return this.newUser.firstName !== this.user.firstName ||
                    this.newUser.lastName !== this.user.lastName ||
                    this.newUser.phone !== this.user.phone
            },
            submitUpdate(){
                if( this.newUser.firstName !== this.user.firstName || 
                    this.newUser.lastName !== this.user.lastName ||
                    this.newUser.phone !== this.user.phone){
                        this.updateUser({
                            firstName: this.newUser.firstName, 
                            lastName: this.newUser.lastName, 
                            phone: this.newUser.phone
                        })
                }        
            },        
            cancelarUpdate() {
                this.newUser.firstName = this.user.firstName
                this.newUser.lastName = this.user.lastName
                this.newUser.phone = this.user.phone   
            }
        },
        computed: {
            canUpdate() {
              return this.updateInformation()
            }
        },
        created(){
            // this.fetchUser();
            this.user = this.getUser();
            this.newUser.firstName = this.user.firstName
            this.newUser.lastName = this.user.lastName
            this.newUser.phone = this.user.phone
        },
        mounted() {
            // this.user = this.getUser();
        },
        watch: {
            'newUser.phone': function(newVal){
                const phoneNumber = newVal.replace(/\D/g, "");
                // Formata o número do telefone
                let formattedPhoneNumber = "";

                // Verifica se o número do telefone é válido e tem pelo menos 10 dígitos
                if (phoneNumber.length >= 10 && phoneNumber.length <= 11) {
                    formattedPhoneNumber = phoneNumber.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
                } else if (phoneNumber.length > 11) {
                    formattedPhoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
                } else {
                    formattedPhoneNumber = phoneNumber;
                }
                this.newUser.phone = formattedPhoneNumber
            },
        }
       
    }
</script>

<style lang="scss" scoped>

</style>