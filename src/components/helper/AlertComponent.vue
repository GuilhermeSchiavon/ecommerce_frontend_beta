<template>
    <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-sm shadow-md">
       <div :class="getBgColor(alert.heading)" class="flex items-center justify-center w-12">
           <svg v-if="alert.heading && alert.heading.toLowerCase() === 'success'" class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"/>
           </svg>
            <svg v-else-if="alert.heading && alert.heading.toLowerCase() === 'alert'" class="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 10-1.5 0v4.5a.75.75 0 101.5 0v-4.5zM10 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="alert.heading && alert.heading.toLowerCase() === 'info'" class="w-6 h-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.25-9.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm-.25 5.75a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-6 h-6 text-white"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
       </div>
       <div class="p-4 -mx-3">
           <div class="mx-3">
               <span :class="getTextColor(alert.heading)" class="font-semibold capitalize">{{ alert.heading }}</span>
               <p v-html="alert.message" class="text-sm text-gray-600"></p>
           </div>
       </div>
   </div>
</template>

<script>
   export default {
       name: 'AlertComponent',
       props: {
           alert: {
               type: Object,
               required: true
           }
       },
       methods: {
           getBgColor(heading) {
               if (!heading) return 'bg-red-500';
               switch (heading.toLowerCase()) {
                    case 'success':
                        return 'bg-green-500';
                    case 'alert':
                        return 'bg-yellow-500';
                    case 'info':
                        return 'bg-gray-200';
                    default:
                        return 'bg-red-500';
               }
           },
           getTextColor(heading) {
               if (!heading) return 'text-red-500';
               switch (heading.toLowerCase()) {
                    case 'success':
                        return 'text-green-500';
                    case 'alert':
                        return 'text-yellow-500';
                    case 'info':
                        return 'text-black';
                    default:
                        return 'text-red-500';
               }
           }
       }
   }
</script>