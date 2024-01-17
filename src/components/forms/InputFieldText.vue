<template>
  <div class="mb-4">
    <label v-if="label" :for="inputID" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input type="text"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :id="inputID"
           :name="inputName"
           :required="required"
           :minlength="minLength"
           :maxlength="maxLength"
           :class="inputClass"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {},
  label: {
    type: String,
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
  },
  inputClass:{
    type: String
  }
})
</script>

<style>

</style>