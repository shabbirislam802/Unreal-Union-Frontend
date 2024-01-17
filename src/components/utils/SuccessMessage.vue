<script setup>
import {ref} from 'vue';

defineProps({
  successText: {
    type: String
  },
  linkName:{
    type: String,
  },
  linkText:{
    type: String,
    default: "Click here!"
  }
})
</script>
<template>
  <div class="w-full bg-green-300 mt-1 block px-3 py-2 border rounded-md shadow-sm">
    {{successText}}
    <router-link v-if="linkName" :to="{name: linkName}" class="border-b border-black">{{linkText}}</router-link>
  </div>
</template>