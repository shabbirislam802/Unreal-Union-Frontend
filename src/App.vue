<script setup>
import {computed, ref} from 'vue';

import Header from '@/components/navigations/Header.vue';

</script>

<template>
  <Header/>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>