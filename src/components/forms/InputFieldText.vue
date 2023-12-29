<template>
  <div class="">
    <label class="">{{label}}</label>
    <input type="text"
           v-bind:id="inputID"
           class=""
           v-bind:name="inputName"
           v-bind:required="required"
           v-bind:minlength="minLength"
           v-bind:maxlength="maxLength"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  label: {
    type: String,
    default: 'Text Input'
  },
  inputName: {
    type: String,
    default: ''
  },
  inputID: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  minLength: {
    type: Number,
    default: 0
  },
  maxLength: {
    type: Number,
    default: 100
  }
})
</script>

<style scoped>

</style>