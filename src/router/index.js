import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/page/:pageNumber',
        name: 'Products',
        component: () => import('@/views/ProductsView.vue')
    },
    {
        path: '/auth',
        name: 'Authentication',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/page/:pageNumber/search/:search',
        name: 'ProductSearch',
        component: () => import('@/views/ProductsView.vue')
    },
    {
        path: '/page/:pageNumber/category/:category',
        name: 'ProductSearch',
        component: () => import('@/views/ProductsView.vue')
    },
    {
        path: '/page/:pageNumber/tag/:tag',
        name: 'ProductSearch',
        component: () => import('@/views/ProductsView.vue')
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/views/ProductView.vue'),
    },
    {
        path: '/favourites',
        name: 'Liked',
        component: () => import('@/views/LikedScreen.vue')
    },
    {
        path: '/profile/account',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/ContactUsView.vue')
    },
    {
        path: '/faq',
        name: 'F.A.Q',
        component: () => import('@/views/FaqView.vue')
    },
    {
        path: '/about_us',
        name: 'AboutUs',
        component: () => import('@/views/AboutUsView.vue')
    },
    {
        path: '/confirm-account/:token',
        name: 'Confirm Account',
        component: () => import('@/views/ConfirmAcountView.vue')
    },
    {
        path: '/password-reset/:tokenPass?',
        name: 'Reset Password',
        component: () => import('@/views/PasswordResetView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Error 404',
        component: () => import('@/views/Error404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`
  window.scrollTo(0, 0);
  next()
})

export default router
