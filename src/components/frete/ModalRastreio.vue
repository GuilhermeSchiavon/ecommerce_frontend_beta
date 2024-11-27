<template>
    <div class="vue-modal">
        <div id="authentication-modal" @click.self="SHOW_MODAL_RASTREIO(false)" tabindex="-1" aria-hidden="true" class="flex h-full bg-gray-800/80 overflow-hidden fixed top-0 right-0 left-0 z-[99] w-full md:inset-0 justify-center items-center">
            <div class="flex items-center relative p-4 w-full max-w-2xl">
                <div class="relative bg-white shadow w-full">
					<button @click="SHOW_MODAL_RASTREIO(false)" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal">
						<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					</button>
					<div class="py-6 px-6 lg:px-8">
						<div class="border-b p-6">
						<h6 class="mb-2 text-base font-semibold">Visão geral</h6>
						<p class="mb-4 text-sm font-light">
							<i class="inline-block font-black not-italic text-green-600" aria-hidden="true"></i>
							<span class="font-semibold">Cod Rastreio</span> #ABC54321ZXC
						</p>
						</div>
						<div class="flex-auto p-6">
						<div class="relative flex flex-col justify-center">
							<div class="absolute left-4 h-full border-r-2"></div>
							<div class="relative mb-4">
							<span class="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">A</span>
							<div class="ml-12 w-auto pt-1">
								<h6 class="text-sm font-semibold text-blue-900">Pedido Recebido</h6>
								<p class="mt-1 text-xs text-gray-500">22 NOV 7:20</p>
							</div>
							</div>
							<div class="relative mb-4">
							<span class="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">B</span>
							<div class="ml-12 w-auto pt-1">
								<h6 class="text-sm font-semibold text-blue-900">Confirmação da Postagem</h6>
								<p class="mt-1 text-xs text-gray-500">21 NOV 11</p>
							</div>
							</div>
							<div class="relative mb-4">
							<span class="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-4 text-center text-base font-semibold text-white shadow">C</span>
							<div class="ml-12 w-auto pt-1">
								<h6 class="text-sm font-semibold text-blue-900">Transito</h6>
								<p class="mt-1 text-xs text-gray-500">21 NOV 9:34</p>
							</div>
							</div>
							<div class="relative">
							<span class="absolute inline-flex h-6 w-6 items-center justify-center text-center text-base font-semibold">
								<span class="text-xl text-blue-900"></span>
							</span>
							<div class="ml-12 w-auto pt-1">
								<h6 class="text-sm font-semibold text-blue-900">Entregue</h6>
								<p class="mt-1 text-xs text-gray-500">17 NOV</p>
							</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>

<script>
  import SpinnerComponent from '@/components/helper/SpinnerComponent.vue'
  import { mapMutations } from 'vuex';

  export default {
    name: 'ModalRastreioComponent',
    components: {
            SpinnerComponent
        },
    data() {
      return {
      }
    },
    methods: {
      ...mapMutations(['SHOW_MODAL_RASTREIO']),
    },
  }
</script>