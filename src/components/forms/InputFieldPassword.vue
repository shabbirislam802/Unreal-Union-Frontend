<template>
  <div class="mb-4">
    <label :for="inputID" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input type="password"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           :id="inputID"
           :name="inputName"
           :required="required"
           :minlength="minLength"
           :maxlength="maxLength"
           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

<style>

</style>