import {createRouter, createWebHistory} from 'vue-router';

import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import Profile from '@/views/Profile.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/sign-in', name: 'Sign-In', component: SignIn},
    {path: '/sign-up', name: 'Sign-Up', component: SignUp},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router