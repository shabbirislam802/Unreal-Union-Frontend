<script setup>
import {computed, ref} from 'vue';

import Header from './components/Header.vue';
import Home from './views/Home.vue';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import Profile from './views/Profile.vue';
import NotFound from './views/NotFound.vue';

const routes = {
  '/': Home,
  '/sign-in': SignIn,
  '/sign-up': SignUp,
  '/profile': Profile
};

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
console.log(currentPath.value, currentPath.value.slice(1), window.location.hash);
</script>

<template>
  <Header/>
  <component v-bind:is="currentView"/>
</template>