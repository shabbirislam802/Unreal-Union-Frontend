<script setup>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const isOpen = ref(false);
const isSignIn = computed(() => store.state.isSignIn);
</script>

<template>
  <header>
    <nav class="flex items-center justify-between p-3 px-10 bg-blue-600 text-white">
      <router-link :to="{name: 'Home'}" class="text-xl font-semibold">Unreal Union</router-link>

      <div class="hidden space-x-4 lg:flex">
        <router-link :to="{name: 'My-Event'}" class="hover:text-blue-200" v-if="isSignIn">Profile</router-link>
        <router-link :to="{name: 'Sign-In'}" class="hover:text-blue-200" v-if="!isSignIn">Sign-In</router-link>
        <router-link :to="{name: 'Sign-Up'}" class="hover:text-blue-200" v-if="!isSignIn">Sign-Up</router-link>
        <router-link :to="{name: 'Sign-Out'}" class="hover:text-blue-200" v-if="isSignIn">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </router-link>
      </div>

      <button
          @click="isOpen = !isOpen"
          class="border border-white px-3 py-2 rounded text-white lg:hidden"
          type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>

      <div :class="{'flex': isOpen, 'hidden': !isOpen}" class="flex-col space-y-2 lg:hidden">
        <router-link :to="{name: 'Profile'}" class="block" v-if="isSignIn">Profile</router-link>
        <router-link :to="{name: 'Sign-In'}" class="block" v-if="!isSignIn">Sign-In</router-link>
        <router-link :to="{name: 'Sign-Up'}" class="block" v-if="!isSignIn">Sign-Up</router-link>
        <router-link :to="{name: 'Sign-Out'}" class="hover:text-blue-200" v-if="isSignIn">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>