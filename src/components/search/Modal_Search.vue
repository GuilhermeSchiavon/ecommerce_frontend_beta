<template>
	<div class="vue-modal">
		<div id="authentication-modal" @click.self="SET_SHOW_MODAL_SEARCH(false)" tabindex="-1" aria-hidden="true" class="flex h-full bg-gray-800/80 overflow-hidden fixed top-0 right-0 left-0 z-[98] w-full md:inset-0 justify-center items-center">
			<div v-if="getShowModalSearch" class="top-0 w-full transition-transform fixed bg-white z-[99] border mt-[5.5em]">
				<div class="flex items-center __sides gap-4 md:gap-8">
					<svg @click="searchKeyword" class="fill-current text-gray-500 w-7 h-7 md:w-9 md:h-9 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
					<input v-model="keyword" @keyup.enter="searchKeyword" type="text" placeholder="Buscar por produtos..." class="w-full py-5 focus:outline-none ">
				</div>
				<nav class="bg-white border-gray-200 border-y">
					<div class="__sides mt-1 bg-white border-gray-200">
						<div class="grid px-2 py-8 mx-auto text-sm text-gray-500 grid-cols-2 md:grid-cols-4">
							<div class="mb-4 space-y-4 md:mb-0 md:col-span-2 grid grid-cols-2">
								<p class="tracking-widest col-span-2 font-thin">CATEGORIAS</p>
								<ul class="mb-4 space-y-4 md:mb-0">
									<li v-for="category in getCategoriesSuggestions.slice(0, 4)" :key="category.id">
										<a :href="`/page/1/category/${category.name}`" class="hover:underline hover:text-blue-600">{{ category.name }}</a>
									</li>
								</ul>
								<ul class="hidden mb-4 space-y-4 md:mb-0 md:block">
									<li v-for="category in getCategoriesSuggestions.slice(4, 8)" :key="category.id">
										<a :href="`/page/1/category/${category.name}`" class="hover:underline hover:text-blue-600">{{ category.name }}</a>
									</li>
								</ul>
							</div>
							<div class="mb-4 space-y-4 md:mb-0 md:block">
								<p class="tracking-widest font-thin">TAGS</p>
								<ul class="mb-4 space-y-4 md:mb-0">
									<li v-for="tag in getTagsSuggestions.slice(0, 4)" :key="tag.id">
										<a :href="`/page/1/tag/${tag.name}`" class="hover:underline hover:text-blue-600">{{ tag.name }}</a>
									</li>
								</ul>
							</div>
							
							<a href="#" class="p-8 bg-local bg-gray-400 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light col-span-2 md:col-span-1">
								<p class="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">
									Visualize nossos melhores produtos
								</p>
								<router-link to="/page/1" type="button"
									class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
									Acesse agora 
									<svg class="w-3 h-3 ml-2 rtl:rotate-180" aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
											stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
									</svg>
								</router-link>
							</a>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '@/router';
import {
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex';

	export default {
		name: 'Modal_SearchComponent',
		components: {},
		data() {
			return {
                keyword: '',
			}
		},
		methods: {
			...mapActions(['fetchCategoriesSuggestions', 'fetchTagsSuggestions']),
			...mapMutations(['SET_SHOW_MODAL_SEARCH']),

			searchKeyword(){
                this.$router.push(`/page/1/search/${this.keyword}`)
				this.SET_SHOW_MODAL_SEARCH(false)
            },
		},
		computed: {
			...mapGetters(['getShowModalSearch', 'getCategoriesSuggestions', 'getTagsSuggestions']),
		},
		async mounted() {
			if (typeof this.getCategoriesSuggestions === 'undefined' || !this.getCategoriesSuggestions.length) {
				await this.fetchCategoriesSuggestions()
            }
			if (typeof this.getTagsSuggestions === 'undefined' || !this.getTagsSuggestions.length) {
				await this.fetchTagsSuggestions()
            }
		}
	}
</script>