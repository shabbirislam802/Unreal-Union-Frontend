import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/store.js';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/sign-in', name: 'Sign-In', component: () => import('@/views/SignIn.vue')},
    {path: '/sign-up', name: 'Sign-Up', component: () => import('@/views/SignUp.vue')},
    {
        path: '/profile', name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        beforeEnter(to, from, next) {
            if(!sessionStorage.getItem('user')){
                next({name: 'Sign-In'});
            } else {
                next();
            }
        },
        children:[
            {path: '/profile/my-events', name: 'My-Event', component: () => import('@/views/MyEvent.vue')},
            {path: '/profile/create-events/:id?', name: 'Create-Event', component: () => import('@/views/CreateEvent.vue')}
        ]
    },
    {path: '/event/:id', name: 'Event', component: () => import('@/views/Event.vue')},
    {
        path: '/sign-out', name: 'Sign-Out', beforeEnter(to, from, next) {
            store.dispatch('signOut').then(() => {
                next('/');
            })
        }
    },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router