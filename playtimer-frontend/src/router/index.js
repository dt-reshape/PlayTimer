import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../layouts/MainLayout'),
        redirect: '/profile',
        children: [
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('@/components/User/Profile'),
                beforeEnter: authGuard,
            },
            {
                path: '/games',
                name: 'Games',
                component: () => import('../components/Games'),
                beforeEnter: authGuard,
            },
            {
                path: '/releases',
                name: 'Releases',
                component: () => import('../components/Releases'),
                beforeEnter: authGuard,
            },
        ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/layouts/LoginLayout'),
      beforeEnter: checkAuthStatus
    },
    {
        path: '*',
        name: 'Error404',
        component: () => import('../views/Error404')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

function authGuard(to, from, next) {
    if (localStorage.getItem('jwt')) {
        next()
    } else {
        next('/login')
    }
}
function checkAuthStatus (to,from,next){
    if (localStorage.getItem('jwt')) {
        next('/')
    } else {
        next()
    }
}
export default router
