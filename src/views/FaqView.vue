<template>
    <div class="min-h-screen">
        <HeaderComponent />
        <main class="space-y-6 __sides py-14 lg:py-24">
            <h1 class="text-center font-playfair font-bold text-3xl text-gray-800">F.A.Q</h1>
            <p class="text-center max-w-2xl mx-auto">Encontre respostas para perguntas frequentes sobre nossos produtos, pedidos e muito mais.</p>
            <div class="mx-auto max-w-5xl border-y divide-y">
                <div v-for="(item, index) in faq" :key="index">
                    <h1 @click="item.isOpen = !item.isOpen" class="font-semibold cursor-pointer grid grid-cols-[85%_auto] items-center justify-between uppercase py-3">
                        <span>{{ item.question }}</span>
                        <PlusToMinusEffectComponent class-style="bg-gray-900" :is-toggled="item.isOpen" />
                    </h1>
                    <div v-if="item.isOpen" class="mb-6">
                        <p v-if="typeof item.answer === 'string'">{{ item.answer }}</p>
                        <ul v-else-if="Array.isArray(item.answer)" class="space-y-4">
                            <li  v-for="list in item.answer" :key="list">{{ list }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import HeaderComponent from '@/components/HeaderComponent.vue';
import PlusToMinusEffectComponent from '@/components/PlusToMinusEffectComponent.vue';
    export default {
        name: "FaqView",
        components: {
    HeaderComponent,
    PlusToMinusEffectComponent
},
        data() {
            return {
                faq: [
                    {
                        question: 'QUANTO TEMPO DEMORA PARA CHEGAR UM PEDIDO?',
                        isOpen: false,
                        answer: 'Normalmente, nossos pedidos chegam dentro de 2 a 4 semanas após o envio. É importante observar que, após sair do nosso armazém, os pedidos podem sofrer atrasos durante o transporte, devido a fatores além do nosso controle. Se você deseja informações mais precisas sobre o status do seu pedido e a data estimada de entrega, recomendamos entrar em contato com a transportadora responsável pela entrega.'
                    },
                    {
                        question: 'COMO POSSO ESCOLHER O TAMANHO CERTO ?',
                        isOpen: false,
                        answer: 'Criamos um sistema de tamanhos universal que tem como objetivo fornecer uma referência única para todos os países. Você pode facilmente encontrar o melhor tamanho para você consultando nosso Guia de Tamanhos, que fornece uma tabela de conversão para todos os principais sistemas de tamanhos dos países. O Guia de Tamanhos está convenientemente disponível na página de cada produto'
                    },
                    {
                        question: 'COMO POSSO RASTREAR MEU PEDIDO?',
                        isOpen: false,
                        answer: 'Assim que você fizer seu pedido online, poderá visualizar os detalhes da compra, acompanhar sua preparação e receber atualizações de envio na seção "Acompanhar Pedido", que está localizada no cabeçalho da página. Em dispositivos móveis, você pode encontrá-la no menu.'
                    },
                    // {
                    //     question: 'HOW CAN I CHOOSE THE RIGHT SIZE FOR ME?',
                    //     isOpen: false,
                    //     answer: [
                    //         'Habitat has created a universal sizing system that aims to provide a unique reference for all countries. You can easily spot the best size for you by referring to our Size Guide that provides a conversion table to all major country size systems.',
                    //         'The Size Guide is conveniently available on the page of each product.'
                    //     ]
                    // },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>