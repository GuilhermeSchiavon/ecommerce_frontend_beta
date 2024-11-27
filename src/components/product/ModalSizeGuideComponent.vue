<template>
	<div class="vue-modal">
		<div id="authentication-modal" @click.self="SHOW_MODAL_VERIFICAR_TAMANHO(false)" tabindex="-1" aria-hidden="true" class="flex h-full bg-gray-800/80 overflow-hidden fixed top-0 right-0 left-0 z-[99] w-full md:inset-0 justify-center items-center">
			<div class="flex items-center relative p-4 w-full max-w-2xl">
				<div class="relative bg-white shadow w-full">
					<button @click="SHOW_MODAL_VERIFICAR_TAMANHO(false)" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal">
						<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					</button>
					<div class="max-w-screen-lg max-h-[70vh] px-6 pb-10 mt-10 overflow-auto bg-white">
						<section v-html="getProduct.sizeGuide" class="mx-auto flex justify-center"></section>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name: "ModalSizeGuideComponent",
		components: {
		},
		methods: {
			...mapMutations(['SET_ALERT', 'SHOW_MODAL_VERIFICAR_TAMANHO']),
		},
		computed: {
			...mapGetters(['getProduct'])
		}    
	};
</script>