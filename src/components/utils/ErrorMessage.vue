<script setup>
import {ref} from 'vue';

defineProps({
  errorText:{
    type: String
  }
})
</script>
<template>
  <div class="w-full bg-red-300 mt-1 block px-3 py-2 border rounded-md shadow-sm">
    {{errorText}}
  </div>
</template>