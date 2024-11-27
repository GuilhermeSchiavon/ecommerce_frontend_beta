<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex items-center justify-center ">
            <div class="w-full mb-40 max-w-lg mx-auto overflow-hidden bg-white rounded-lg border">
                
                <div class="px-6 py-4">
                   
                    <h3 class="my-5 text-xl font-medium text-center text-gray-600">Redefinir Senha</h3>
                    <p v-if="getPasswordSlep === 1" class="mt-1 text-center text-gray-500">Informe seu Email </p>
                    <p v-if="getPasswordSlep === 2" class="mt-1 text-center text-gray-500">Solicitação enviada</p>
                    <p v-if="getPasswordSlep === 3" class="mt-1 text-center text-gray-500">Preencha com a nova Senha</p>

                    <form v-if="getPasswordSlep === 1">
                        <div class="w-full mt-4">
                            <input v-model="userInput" @input="applyMask" class="input-style" type="text" aria-label="Email" required/>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <router-link to="auth" class="flex items-center text-sm text-gray-400 hover:text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Voltar
                            </router-link>
                            <button @click.prevent="submitConfirmPass" :class="{'cursor-not-allowed' : getLoadingPassword}" class="flex px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">
                                <div  v-if="getLoadingPassword" class="flex w-full scale-50">
                                    <SpinnerComponent class="m-auto h-6" />
                                </div>
                                <span v-else>Avançar</span>
                            </button>
                        </div>
                    </form>
                    <div v-if="getPasswordSlep === 2" class="w-full mt-4">
                        <div class="px-6">
                            <p class="text-lg my-4 text-gray-600">Enviamos um e-mail para <span class="text-black font-medium">{{ email }}</span>, o link.</p>
                            <p class="mb-4 text-gray-500">Se você não receber o email em alguns minutos, por favor, verifique sua caixa de spam.</p>
                        </div>
                    </div>
                    <form @submit.prevent="submitNewPassword" v-if="getPasswordSlep === 3">
                        <div class="w-full mt-4 relative">
                            <input v-model="password" :type="senhaVisivel ? 'text' : 'password'" class="input-style" placeholder="Nova Senha" aria-label="password" required/>
                            <a id="olho" class="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer" @click="senhaVisivel = !senhaVisivel">
                                <svg id="eye" v-show="!senhaVisivel" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                <svg v-show="senhaVisivel" id="eye-slash" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
                            </a>
                        </div>
                        <div class="w-full mt-4 relative">
                            <input v-model="confirm_password" :type="senhaConfirmVisivel ? 'text' : 'password'" class="input-style" placeholder="Confirmar Senha" aria-label="confirm-password" required/>
                            <a id="olho" class="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer" @click="senhaConfirmVisivel = !senhaConfirmVisivel">
                                <svg id="eye" v-show="!senhaConfirmVisivel" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                <svg v-show="senhaConfirmVisivel" id="eye-slash" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
                            </a>
                        </div>
                        <div class="transition ease-in-out delay-150 duration-300 mt-4 col-span-6">
                            <div v-if="condition.nivel <= 3" class="grid grid-cols-4 gap-2 my-2">
                                <div :class="condition.nivel >= 1 ? 'bg-orange-300' : 'bg-gray-200'" class="h-1"></div>
                                <div :class="condition.nivel >= 2 ? 'bg-orange-300' : 'bg-gray-200'" class="h-1"></div>
                                <div :class="condition.nivel >= 3 ? 'bg-orange-300' : 'bg-gray-200'" class="h-1"></div>
                                <div class="bg-gray-200 h-1"></div>
                            </div>
                            <div v-if="condition.nivel == 4" class="grid grid-cols-4 gap-2 my-2">
                                <div v-for="index in 4" :key="index" class="bg-green-300 h-1"></div>
                            </div>
                            <ul>
                                <li class="flex items-center">
                                    <svg v-if="condition.maiusculo" class="w-3.5 h-3.5 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                                    <svg  v-else class="w-3 h-3 mr-2.5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                                    Letras minúsculas e maiúscula.
                                </li>
                                <li class="flex items-center">
                                    <svg v-if="condition.caractere" class="w-3.5 h-3.5 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                                    <svg  v-else class="w-3 h-3 mr-2.5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                                    Inclusão de pelo menos um caractere especial, por exemplo (! @#?).
                                </li>
                                <li class="flex items-center">
                                    <svg v-if="condition.minimo" class="w-3.5 h-3.5 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                                    <svg  v-else class="w-3 h-3 mr-2.5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                                    Uma senha longa (mín. 8 caracteres).
                                </li>
                                <li class="flex items-center">
                                    <svg v-if="condition.confirmation" class="w-3.5 h-3.5 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/></svg>
                                    <svg  v-else class="w-3 h-3 mr-2.5 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
                                    Confirmação da senha.
                                </li>
                            </ul>
                        </div>
                        <div class="flex items-center justify-end mt-4">
                            <button type="submit" :class="condition.nivel <= 3 ? 'bg-gray-300' : 'bg-gray-700'" class=" flex px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none">
                                <span v-if="!getLoadingPassword">Salvar</span>
                                <div v-else class="flex w-full scale-50">
                                    <SpinnerComponent class="m-auto h-6" />
                                </div>
                            </button>
                        </div>
                    </form>
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
        name: 'PasswordReset',
        components: {
            HeaderComponent,
            SpinnerComponent
        },
        data() {
            return {
                userInput: "",
                email: "",
                password: "",
                confirm_password: "",
                senhaVisivel: false,
                senhaConfirmVisivel: false,
                condition: {
                    nivel: 0,
                    maiusculo: false,
                    caractere: false,
                    minimo: false,
                    confirmation: false,
                }
            }
        },
        methods: {
            ...mapMutations(['SET_ALERT', 'LOG_USER_OUT']),
            ...mapActions(['newPessVerificarEmail', 'submitNewPass']),

            startCountdown() {
                this.progressValue = 0

                setInterval(() => {
                    this.progressValue ++;
                    if(this.progressValue == 100) {
                        this.progressVisible = false
                        this.resendButtonVisible = true
                    }
                }, 1000);
            },
            applyMask() {
                const userInput = this.userInput;
                const userInputSemFormato = userInput.replace(/[^0-9]/g, '');

                // Verificar se é um e-mail
                if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userInput)) {
                    this.userInput = userInput.toLowerCase(); // Converte o email para minúsculas
                }
                else if (/^\d{11}$/.test(userInput)) {
                    this.userInput = userInput.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); // Se já tem 11 dígitos, aplicar a máscara
                }
                else if(userInputSemFormato.length === 14) {
                    this.userInput = userInput.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
                }
            },
            submitNewPassword(){
                if (!this.password) {
                    return this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Nova Senha.'})
                }
                if (!this.confirm_password) {
                    return this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Confirmar Senha.'})
                }
                if (!this.password) {
                    return  this.SET_ALERT({ heading: 'error', message: 'Por favor, informe a Senha.'});
                }
                if (!this.confirm_password) {
                    return this.SET_ALERT({ heading: 'error', message: 'Por favor, informe a Canfirmação da Senha.'});
                }
                if (!/[A-Z]/.test(this.password)) {
                    return this.SET_ALERT({ heading: 'error', message: 'Senha sem Letras minúsculas e maiúscula.'});
                }
                if (!/[!@#?]/.test(this.password)) {
                    return this.SET_ALERT({ heading: 'error', message: 'Senha sem pelo menos um caractere especial.'});
                }
                if (this.password.length < 8) {
                    return this.SET_ALERT({ heading: 'error', message: 'Senha muito curta (mín. 8 caracteres).'});
                }
                if (this.password !== this.confirm_password) {
                    return this.SET_ALERT({ heading: 'error', message: 'As senhas não correspondem'})
                }
                if (!this.$route.params.tokenPass) {
                    return this.SET_ALERT({ heading: 'error', message: 'Token inválido, tente novamente.'})
                }
                if(this.password && this.confirm_password && this.$route.params.tokenPass){
                    this.submitNewPass({
                        password: this.password,
                        token: this.$route.params.tokenPass
                    });
                }
            },
            async submitConfirmPass(){
                if(!this.getLoadingPassword){
                    if (!this.userInput) {
                        this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo com CPF, CNPJ ou E-mail.'})
                        return;
                    }
                    let userInputToSend = this.userInput

                    if(this.userInput.replace(/[^0-9]/g, '').length >= 11) {
                        userInputToSend = userInputToSend.replace(/[^0-9]/g, '');
                    }

                    this.email = await this.newPessVerificarEmail({ userInput: userInputToSend , typeInput: this.typeInput })
                }
            },
            validatePassword() {
                let passwordNivel = 0;

                if (/[A-Z]/.test(this.password)) {
                passwordNivel++;
                }
                if (/[!@#?]/.test(this.password)) {
                passwordNivel++;
                }
                if (this.password.length >= 8) {
                passwordNivel++;
                }

                if (this.password == this.confirm_password) {
                passwordNivel++;
                }

                this.condition.maiusculo = /[A-Z]/.test(this.password);
                this.condition.caractere = /[!@#?]/.test(this.password);
                this.condition.minimo = this.password.length >= 8;
                this.condition.confirmation = this.password == this.confirm_password;
                this.condition.nivel = passwordNivel;
            }
        },
        mounted() {
            this.startCountdown();
            const token = this.$route.params.tokenPass;
            if(token){
                this.$store.dispatch('newPessVerificarToken', { token })
            }
        },    
        computed: {
            ...mapGetters(['getLoadingPassword', 'getPasswordSlep']),
        },
        watch: {
            password: function(newPass, oldPass){
                if(newPass && newPass != oldPass) {
                    this.validatePassword()
                }
            },
            confirm_password: function(newPass, oldPass){
                if(newPass && newPass != oldPass) {
                    this.validatePassword()
                }
            }
        }
    }
</script>