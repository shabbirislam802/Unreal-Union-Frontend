<script setup>

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h1 class="text-6xl font-bold">404</h1>
    <p class="text-xl mt-2">Page not found</p>
    <p class="mt-4 text-lg text-center">
      We are sorry, the page you are looking for does not exist or has been moved.
    </p>
    <router-link :to="{name: 'Home'}" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
      Back to the homepage
    </router-link>
  </div>
</template>