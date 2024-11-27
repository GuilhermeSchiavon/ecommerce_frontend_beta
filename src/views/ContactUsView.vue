<template>
    <div class="min-h-screen flex flex-col">
        <HeaderComponent />
        <div class="flex-grow flex mt-10 mb-20 lg:mt-16">
            <div class="w-full max-w-5xl px-6 py-4 mx-auto">
                <h2 class="text-3xl font-semibold font-playfair text-center text-gray-800 dark:text-white">Entrar em contato</h2>
                <p class="mt-3 mx-auto max-w-2xl text-center text-gray-600 dark:text-gray-400">Entre em contato conosco para quaisquer dúvidas, problemas ou feedback. Nossa equipe de suporte está disponível para ajudar você da melhor maneira possível.</p>
                <form @submit.prevent="submitForm" class="mt-6 grid gap-6 md:grid-cols-2 grid-cols-1">
                    <div class="md:col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Assunto</label>
                        <select v-model="form.assunto" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:text-gray-300 focus:outline-gray-600">
                            <option value="Dúvida sobre Produto">Dúvida sobre Produto</option>
                            <option value="Problema com Pedido">Problema com Pedido</option>
                            <option value="Feedback sobre Experiência de Compra">Feedback sobre Experiência de Compra</option>
                            <option value="Solicitação de Informações Gerais">Solicitação de Informações Gerais</option>
                            <option value="Assistência com Devolução/Reembolso">Assistência com Devolução/Reembolso</option>
                        </select>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Nome</label>
                        <input v-model="form.nome" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:text-gray-300 focus:outline-gray-600" type="text" :maxlength="maxNomeLength" required>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>
                        <input v-model="form.email" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:text-gray-300 focus:outline-gray-600" type="email" required>
                    </div>
                    <div class="md:col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Telefone</label>
                        <input v-model="form.telefone" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:text-gray-300 focus:outline-gray-600" type="tel" required>
                    </div>
                    <div class="md:col-span-2">
                        <div class="flex items-center justify-between">
                            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Mensagem</label>
                            <span class="text-right text-gray-400 text-sm">{{ form.mensagem.length }} / 500</span>
                        </div>
                        <textarea v-model="form.mensagem" class="block w-full h-60 px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:text-gray-300 focus:outline-gray-600" :maxlength="maxMensagemLength" required></textarea>
                    </div>

                    <div class="flex justify-center lg:justify-start md:col-span-2">
                        <button type="submit" class="py-3.5 button-2 text-center w-full max-w-xs text-white text-sm focus:outline-gray-600 inline-block">Enviar Mensagem</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import HeaderComponent from '../components/HeaderComponent.vue'
    export default {
        name: 'ContactUs',
        components: {
            HeaderComponent
        },
        data() {
            return {
                form: {
                    assunto: 'Dúvida sobre Produto',
                    nome: '',
                    email: '',
                    telefone: '',
                    mensagem: ''
                },
                maxNomeLength: 255,
                maxMensagemLength: 500
            }
        },
        methods: {
            ...mapMutations(['SET_ALERT']),
            validarDados(){
                if (!this.form.nome ) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, informe o "Nome".'});
                    return false;
                }
                if (this.form.nome.length > this.maxNomeLength) {
                    alert(`O campo "Nome" deve ter no máximo ${this.maxNomeLength} caracteres.`);
                    return false;
                }
                if (!this.form.mensagem) {
                    this.SET_ALERT({ heading: 'error', message: 'Por favor, preencha o campo "Nome".'});
                    return false;
                }
                if (this.form.mensagem.length > this.maxMensagemLength) {
                    alert(`O campo "Mensagem" deve ter no máximo ${this.maxMensagemLength} caracteres.`);
                    return false;
                }
                return true;
            },
            submitForm() {
                if(!this.validarDados) return
                const corpoEmail = `%0D%0ANome: ${this.form.nome}%0D%0AE-mail: ${this.form.email}%0D%0ATelefone: ${this.form.telefone}%0D%0AMensagem: ${this.form.mensagem}`;
                const linkEmail = `mailto:${process.env.VUE_APP_EMAIL}?subject=[ Suporte - ${this.form.assunto} ]&body=${corpoEmail}`;
                
                window.location.href = linkEmail;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button-2 {
        color: #fff;
        border: 1px solid black;
        background-image: -webkit-linear-gradient(30deg, black 50%, transparent 50%);
        background-image: linear-gradient(30deg, black 50%, transparent 50%);
        background-size: 800px;
        background-repeat: no-repeat;
        background-position: 0%;
        -webkit-transition: background 300ms ease-in-out;
        transition: background 300ms ease-in-out;
    }
    .button-2:hover {
        background-position: 100%;
        color: black;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        70% {
            transform: scale(.9);
        }
        100% {
            transform: scale(1);
        }
    }
</style>