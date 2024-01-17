<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
});

const internalRating = ref(props.value);

watchEffect(() => {
  internalRating.value = props.value;
});

const updateRating = (newRating) => {
  internalRating.value = newRating;
  emit('update:value', newRating);
};
</script>

<template>
  <div class="star-rating">
    <span
        v-for="star in 5"
        :key="star"
        class="star"
        @click="updateRating(star)"
        :class="{ filled: star <= internalRating }"
    >
      ★
    </span>
  </div>
</template>

<style scoped>
.star-rating .star {
  cursor: pointer;
  color: gold;
}
.star-rating .star.filled {
  color: orange;
}
</style>
