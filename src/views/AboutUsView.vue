<template>
    <div>
        <HeaderComponent />
        <div class="grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2">
            <div class="bg-gray-300 bg-center bg-cover md:aspect-[6/3]" :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1538329972958-465d6d2144ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'}">
                
            </div>
            <div class="bg-orange-100 flex md:items-center justify-center">
                <div class="text-center max-w-3xl py-14 px-8">
                    <h1 class="uppercase text-xs font-semibold tracking-widest font-playfair">out story</h1>
                    <h1 class="uppercase text-rose-600 text-3xl font-playfair font-bold lg:text-4xl py-4">Lorem ipsum dolor sit</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem id consequatur magnam maiores quidem ratione, quas vitae reprehenderit veritatis facilis nobis</p>
                </div>
            </div>
        </div>
        <section class="bg-gray-50">
            <div class="__sides">
                <div class="max-w-3xl mx-auto py-8 lg:py-20 px-8">
                    <h1 class="text-3xl font-bold py-4">Lorem ipsum dolor sit.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus est numquam neque ducimus facere atque quo explicabo illum nesciunt minima, reiciendis iusto natus adipisci quas quia odio saepe assumenda voluptatem repellendus. Facere distinctio aliquam assumenda earum, quod esse rem nulla nam ullam dignissimos voluptatem voluptas nesciunt voluptatibus blanditiis soluta sunt vero modi, fugiat unde incidunt? Aliquam debitis id culpa tempora totam quas sed. Est odio, tenetur tempore molestiae dolorum ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima dolorum ullam voluptatibus necessitatibus autem architecto accusantium? Placeat assumenda fugit similique, sint ea nam quidem minima sapiente dicta, corporis at ab repellat aliquam illum nihil laboriosam obcaecati perferendis distinctio error voluptas!</p>
                </div>
            </div>
            <div class="hidden xl:flex gap-4 max-w-[1700px] mx-auto">
                <div class="aspect-square w-full" :style="{backgroundImage: 'url('+ item +')'}" v-for="(item, index) in squareImages" :key="index">
                </div>
            </div>
            <div class="xl:hidden">
                <vue-horizontal :button="false" class="mx-auto">
                    <div class="aspect-square h-[24em] mr-1" :style="{backgroundImage: 'url('+ item +')'}" v-for="(item, index) in squareImages" :key="index">
                    </div>
                </vue-horizontal>
            </div>
            <div class="__sides">
                <div class="max-w-5xl mx-auto py-8 lg:py-20 px-8">
                    <h1 class="text-3xl font-bold text-center py-4">Lorem ipsum dolor sit.</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus est numquam neque ducimus facere atque quo explicabo illum nesciunt minima, reiciendis iusto natus adipisci quas quia odio saepe assumenda voluptatem repellendus. Facere distinctio aliquam assumenda earum</p>
                    <p class="mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus est numquam neque ducimus facere atque quo explicabo illum nesciunt minima, reiciendis iusto natus adipisci quas quia odio saepe assumenda voluptatem repellendus. Facere distinctio aliquam assumenda earum Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero autem eligendi saepe est facilis! Eveniet quibusdam voluptatibus, dolorum, error laborum vel asperiores sint temporibus corrupti impedit voluptatem. Illo, a.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import VueHorizontal from "vue-horizontal";

    export default {
        name: "AboutUsView",
        components: { 
            HeaderComponent,
            VueHorizontal
        },
        data: () => {
            return {
                squareImages: [
                    'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    'https://images.unsplash.com/photo-1585591359088-e144e8a61170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=60',
                    'https://images.unsplash.com/photo-1578854955076-970394ef2512?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                ],
                items: [...Array(20).keys()].map((i) => {
                    return {title: `Item ${i}`, content: `🚀 Content ${i}`};
                })
            }
        }
    }
</script>