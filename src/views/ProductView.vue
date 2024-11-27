<template>
    <div class="__product min-h-screen flex flex-col">
        <HeaderComponent />  
        <main class="flex-grow sm:py-12">
            <div class="_image_and_info grid lg:grid-cols-2 container m-auto">
                <div class="mx-16" v-if="getProductLoading">
                    <div class="w-full animate-pulse bg-gray-300 h-96 rounded-md "></div>
                </div>
                <div v-else class="sm:px-6 flex items-center justify-center ">
                    <div class="lg:flex lg:items-start">
                        <div class="lg:order-2 lg:ml-5">
                            <div class="max-w-xl overflow-hidden sm:rounded-lg">
                                <img :src="imageCenter" :alt="`Picture of ${getProduct.name}`" class="w-full h-full max-w-full object-cover lg:hover:scale-[2] cursor-pointer" @mousemove="updateZoom($event)" :style="zoomStyle">
                            </div>
                        </div>
                        <div class="w-full mt-2 lg:mt-0 lg:order-1 lg:w-20 lg:flex-shrink-0">
                            <div class="flex flex-row items-start lg:flex-col space-x-1 ">
                            <button v-for="(image, indexImage) in getProduct.Images" :key="indexImage"
                                @click="changeImageCenter(image.filename)"
                                @mouseover="changeImageCenter(image.filename)"
                                type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-gray-900 text-center">
                                <img v-if="image && imageLoaded[indexImage+'_'+getProduct.id] != false" @error="handleImageError(indexImage+'_'+getProduct.id)" :src="imageUrl(image.filename)" :alt="getProduct.name" class="h-full w-full object-cover" >
                                <svg v-else class="w-10 h-10 border-2 rounded-full flex p-1.5 bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductSkeleton v-if="getProductLoading" class="p-6 pb-0 pt-12"/>
                <InformationComponent v-else @reviews="scrollToReviews" class="p-6 pb-0 pt-12"/>
            </div>
            <div class="flex items-center border-b lg:mt-20 border-t justify-center">
                <button 
                    @click="show = 'Description'" 
                    :class="show === 'Description' && 'text-blue-500 border-blue-500'" 
                    class="transition duration-300 lg:border-b-2 ease-in-out border-transparent text-gray-700 lg:mt-2 text-xs py-4 px-5 font-bold">Descrição</button>
                <button 
                    @click="show = 'Reviews'" 
                    :class="show === 'Reviews' && 'text-blue-500 border-blue-500'" 
                    class="relative transition duration-300 lg:border-b-2 ease-in-out border-transparent text-gray-700 lg:mt-2 text-xs py-4 px-5 font-bold">Reviews
                    <span style="font-size: .8em" class="bg-gray-300 flex items-center justify-center h-4 w-4 rounded-full absolute top-2 right-0">{{getProductLoading ? 0 : getProduct.num_reviews}}</span>
                </button>
            </div>
            <div class="container m-auto">
                <div class="px-6 " v-if="show === 'Description' && !getProductLoading">
                    <dl class="text-sm my-6 py-5">
                        <div v-if="getProduct.Categories && getProduct.Categories.length" class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-4 sm:gap-4">
                            <dt class="font-medium text-gray-900 sm:text-right">CATEGORIAS</dt>
                            <dd class="text-gray-700 sm:col-span-3">{{getProduct.Categories.map(category => category.name).join(', ')}}</dd>
                        </div>

                        <div v-if="getProduct.Tags && getProduct.Tags.length" class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-4 sm:gap-4">
                            <dt class="font-medium text-gray-900 sm:text-right">TAGS</dt>
                            <dd class="text-gray-700 sm:col-span-3">{{ getProduct.Tags.map(tag => tag.name).join(', ') }}</dd>
                        </div>

                        <div v-if="getProduct.description && getProduct.description !== undefined && getProduct.description !== ''" class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-4 sm:gap-4">
                            <dt class="font-medium text-gray-900 sm:text-right">MATERIAL & DESCRIÇÃO</dt>
                            <dd class="text-gray-700 sm:col-span-3">{{ getProduct.description }}</dd>
                        </div>
                    </dl>
                </div>
                <section ref="reviews" v-if="show === 'Reviews' && !getProductLoading">
                    <ReviewsComponent :reviews="getProduct.Reviews"/>
                </section>
            </div>
        </main>  
       
    </div>
</template>

<script>
    import ReviewsComponent from '../components/product/ReviewsComponent.vue'
    import InformationComponent from '../components/product/InformationComponent.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
    import ProductSkeleton from '../components/skeleton/ProductSkeleton.vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Product',
        components: {
            ReviewsComponent,
            InformationComponent,
            HeaderComponent,
            ProductSkeleton
        },
        data() {
            return {
                show: 'Description',
                imageCenter: '',
                zoomStyle: '',
                imageLoaded: []
            }
        },
        methods: {
            ...mapMutations(['SET_SELECTED']),
            ...mapActions(['fetchProduct']),

            
            imageUrl(image){
                return `${process.env.VUE_APP_URL_SERVER}/uploads/products/${image}`
            },
            handleImageError(index) {
                this.imageLoaded[index] = false;
            },
            changeImageCenter(image){
                return `${process.env.VUE_APP_URL_SERVER}/uploads/products/${image}`
            },
            async scrollToReviews() {
                this.show = 'Reviews';
                setTimeout(() => {
                    const element = this.$refs['reviews'];
                    const top = element.offsetTop;
                    window.scrollTo({top: top, behavior: 'smooth'});
                }, 1);
            },
            updateZoom(event) {
                const { clientX, clientY, target } = event;
                const { left, top, width, height } = target.getBoundingClientRect();
                
                const offsetX = ((clientX - left) / width) * 100;
                const offsetY = ((clientY - top) / height) * 100;
                
                const transformOrigin = `${offsetX}% ${offsetY}%`;
                
                this.zoomStyle = `transform-origin: ${transformOrigin}; transition: transform 0.5s ease-in-out 0s;`;
            }
        },
        computed: {
            ...mapGetters(['getProduct', 'getProductLoading']),
        },
        destroyed(){
            this.SET_SELECTED()
        },
        created(){
            this.fetchProduct(this.$route.params.id).then(() => {
                this.imageCenter =  `${process.env.VUE_APP_URL_SERVER}/uploads/products/${this.getProduct.Images[0].filename}`
            })
        },
        watch: {
            '$route.params.id': function(newId, oldId) {
                if(newId !== oldId){
                    this.fetchProduct(newId).then(() => {
                        this.imageCenter =  `${process.env.VUE_APP_URL_SERVER}/uploads/products/${this.getProduct.Images[0].filename}`
                    });
                }
            },
        },
    }
</script>