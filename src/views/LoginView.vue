<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <main class="flex-grow flex items-center justify-center ">
            <div v-if="!getConfirmation" class="w-full mb-40 max-w-lg mx-auto overflow-hidden bg-white rounded-lg border">
                <div class="px-6 py-4">
                    <h3 class="mt-1 text-xl font-medium text-center text-gray-600">Bem vindo</h3>
                    <p  v-if="login" class="mt-1 text-center text-gray-500">Login</p>
                    <p v-else class="mt-1 text-center text-gray-500">Registrar-se</p>

                    <form>
                        <div v-if="!login" class="w-full mt-4">
                            <input v-model="firstName" class="input-style" type="email" placeholder="Nome" aria-label="Nome" required/>
                            <input v-model="lastName" class="input-style" type="email" placeholder="Sobrenome" aria-label="Sobrenome" required/>
                            <input v-model="phone" class="input-style" type="tel" placeholder="Telefone" aria-label="Telefone Celular" maxlength="15" required/>
                            <input v-model="cpf" class="input-style" type="tel" placeholder="CPF" aria-label="Telefone Celular" complete="off" maxlength="14" required @keydown.enter.prevent/>
                        </div>
                        
                        <div class="w-full mt-4">
                            <input v-model="email" class="input-style" type="email" placeholder="Email" aria-label="Email" required/>
                        </div>

                        <div class="w-full mt-4">
                            <input v-model="password" class="input-style" type="password" placeholder="Password" aria-label="Password" required/>
                        </div>

                        <div class="flex items-center justify-between mt-4">
                            <router-link to="password-reset" class="text-sm text-gray-600 hover:text-gray-500">Esqueceu a senha?</router-link>
                            
                            <button :class="getLoadingUser && 'cursor-not-allowed'" v-if="login" @click.prevent="submitLogin" class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform focus:outline-none bg-gray-700 rounded hover:bg-gray-600">
                                <div class="flex scale-50" v-if="getLoadingUser">
                                    <SpinnerComponent class="m-auto h-6" />
                                </div>
                                <span v-else class="mx-4 text-center">
                                    Entrar
                                </span>
                            </button>
                            <button v-if="!login" @click.prevent="submitRegister" class="flex px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">
                                <div v-if="getLoadingUser" class="h-5 w-5 mr-2 animate-spin _spinner rounded-full border-4"></div>
                                <span class="ml-2">Register</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div class="flex items-center justify-center py-4 text-center bg-gray-50">
                    <span v-if="login" class="text-sm text-gray-600">Não possui uma conta? </span>
                    <span v-else class="text-sm text-gray-600">Já tem uma conta? </span>
                    <p role="button" v-if="login" @click="login = !login" class="mx-2 text-sm font-bold text-blue-500 hover:underline">Registrar</p>
                    <p role="button" v-if="!login" @click="login = !login" class="mx-2 text-sm font-bold text-blue-500 hover:underline">Login</p>
                </div>
            </div>
            <div v-else class="w-full mb-40 max-w-lg mx-auto overflow-hidden bg-white rounded-lg border border-gray-100">
                <div class="px-6 py-4">
                    <h3 class="mt-1 text-xl font-medium text-center text-gray-600">Confirmação de E-mail</h3>
                    <p class="text-lg font-semibold my-4 text-gray-600">Enviamos um e-mail para <span class="text-black">{{ email }}</span>, por favor confirme sua conta.</p>
                    <p class="mb-4 text-gray-500">Se você não receber o email em alguns minutos, por favor, verifique sua caixa de spam.</p>
                    <div v-if="resendButtonVisible" class="mb-4 text-sm">
                        <p>Não recebeu mesmo assim o e-mail? </p>
                        <button class="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-semibold py-2 px-3 mt-2 rounded border border-blue"  @click="resendConfirmationEmail">Reenviar e-mail</button>
                    </div>
                    <p v-else class="text-gray-400">
                        Reenviar o codigo em  {{ (progressValue) }} segundos
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    import SpinnerComponent from '@/components/helper/SpinnerComponent.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'Login',
        components: {
            HeaderComponent,
            SpinnerComponent
        },
        data() {
            return {
                login: true,
                password: "",
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                cpf: "",
                maxTimeResendButtonVisible: 120,
                resendButtonVisible: false,
                progressValue: 0,
                intervalId: null
            }
        },
        
        methods: {
            ...mapMutations(['SET_ALERT']),
            ...mapActions(['loginUser', 'registerUser', 'registerUserAgain']),

            startCountdown() {
                this.progressValue = this.maxTimeResendButtonVisible

                this.intervalId = setInterval(() => {
                    this.progressValue--;
                    if (this.progressValue === 0) {
                        clearInterval(this.intervalId);
                        this.resendButtonVisible = true;
                    }
                }, 1000);
            },
            resendConfirmationEmail() {
                this.progressValue = this.maxTimeResendButtonVisible;
                this.startCountdown();
                this.registerUserAgain({
                    email: this.email, 
                    password: this.password
                })
                this.resendButtonVisible = false
            },    
            submitLogin(){
                if(!this.getLoadingUser){
                    if(this.email && this.password){
                        this.loginUser({
                            email: this.email, 
                            password: this.password
                        });
                    }
                }
            },
            submitRegister(){
                if (!this.firstName) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Nome.'})
                    return;
                }
                if (!this.lastName) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Sobrenome.'})
                    return;
                }
                if (!this.phone) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Telefone.'})
                    return;
                }
                if (!this.cpf) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo CPF.'})
                    return;
                }
                const cpfInvalido = !this.validarCPF(this.cpf)
                if (cpfInvalido) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, insira um CPF válido.' });
                    return;
                }
                if (!this.email) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo E-mail.'})
                    return;
                }
                if (!this.password) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo Senha.'})
                    return;
                }
                
                if(this.firstName && this.lastName && this.phone && this.email && this.password){
                    this.registerUser({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phone: this.phone,
                        cpf: this.cpf,
                        email: this.email, 
                        password: this.password
                    })
                }
            },
            formatarCPF(cpf) {
              if (cpf.length > 3) {
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
              }
              if (cpf.length > 7) {
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
              }
              if (cpf.length > 11) {
                cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2');
              }

              return cpf;
            },
            validarCPF(cpf) {
              cpf = cpf.replace(/\D/g, '');

              if (cpf.length !== 11) {
                return false;
              }

              if (/^(\d)\1+$/.test(cpf)) { // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
                return false;
              }

              let soma = 0; // Calcula o primeiro dígito verificador
              for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i)) * (10 - i);
              }
              let resto = 11 - (soma % 11);
              let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

              if (parseInt(cpf.charAt(9)) !== digitoVerificador1) { // Verifica o primeiro dígito verificador
                return false;
              }

              soma = 0; // Calcula o segundo dígito verificador
              for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i)) * (11 - i);
              }
              resto = 11 - (soma % 11);
              let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

              if (parseInt(cpf.charAt(10)) !== digitoVerificador2) { // Verifica o segundo dígito verificador
                return false;
              }
              
              return true; // CPF válido
            },
        },
        beforeDestroy() {
            clearInterval(this.intervalId);
        },
        watch: {
            phone(newVal) {
                // Remove todos os caracteres que não sejam números do valor do campo de telefone
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

                // Atualiza o valor do campo de telefone
                this.phone = formattedPhoneNumber;
            },
            cpf(newValue){
                const regex = /[^0-9]/g;
                const valueAsString = String(newValue);
                const cpfSemFormato = valueAsString.replace(regex, '');
                const cpfFormatado = this.formatarCPF(cpfSemFormato);
                this.cpf = cpfFormatado;
            },
            '$store.state.user.user_confirmation': function(newVal) {
                if(newVal){
                    this.startCountdown()
                }
            }
        },
        computed: {
            ...mapGetters(['getLoadingUser', 'getConfirmation']),
            
        },
        
    }
</script>

<style lang="scss" scoped>

    $_spinner: rgb(87, 87, 87);

    ._spinner {
        border-top-color: #c7c7c7;
        border-right-color: $_spinner;
        border-left-color: $_spinner;
        border-bottom-color: $_spinner;
    }
    
    .login__component {
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        display: flex;

        .__form {
            width: 100%;
            flex-grow: 1;
            background-color: #F1F1F1;
            max-width: 400px;
            display: flex;
            align-items: center;
            position: relative;

            form {
                width: 100%;
                padding: 2em;
                margin-bottom: 40%;
                display: flex;
                flex-direction: column;

                label {
                    font-size: .9rem;
                    font-weight: bold;
                    color: #707070;
                    margin-bottom: .8em;

                    &:not(:first-child){
                        margin-top: 1.5em;
                    }
                }
                
                input[type="text"], input[type="password"]{
                    border: 2px #D9D9D9 solid;
                    
                    border-radius: 6px;
                    background-color: rgb(255, 255, 255);       
                    color: rgb(82, 82, 82);
                    padding: 1.3em 1em;
                    width: 100%;
                    font-family: inherit;
                    font-weight: semi-bold;
                    font-size: .878em;

                    &:focus {
                        outline: none;
                    }
                }

                input[type="submit"] {
                    background-color: #559BD8;
                    border: none;
                    width: 100%;
                    max-width: 144px;
                    color: #f3f3f3;
                    padding: 1em 0;
                    border-radius: 50em;
                    font-size: 0.78em;
                    cursor: pointer;
                }

                > div {
                    margin-top: 2em;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    a {
                        font-size: .8rem;
                        font-weight: bold;
                        color: #484848;
                        text-decoration: none;
                        margin-right: 1em;
                    }
                }

                input:focus {
                    outline: none;
                }
            }
        }

        section {
            width: 100%;
            flex-grow: 1;
            
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    

</style>