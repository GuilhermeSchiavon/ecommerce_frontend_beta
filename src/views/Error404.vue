<template>
    <div class="min-h-screen flex flex-col bg-white">
        <HeaderComponent />
        <div class="flex flex-col h-[60vh]">
            <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                alt=""
                class="object-cover w-full h-64"
            />

            <div class="flex items-center justify-center flex-1">
                <div class="max-w-xl px-4 py-8 mx-auto text-center">
                 <h1 class="tracking-widest text-gray-500 uppercase">404 | Not Found</h1>
                <router-link to="/" class="flex items-center justify-center px-5 py-3 mt-6 text-sm font-medium border border-gray-200 shadow-sm text-gray-500 bg-gray-200 rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:ring">
                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Pagina Principal
                </router-link>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from '../components/HeaderComponent.vue'
    export default {
        name: 'Error404View',
        components: {
            HeaderComponent
        }
    }
</script>
