<template>
  <div class="flex h-screen bg-gray-100">
    <div class="flex flex-col w-64 bg-white shadow-md">
      <ul class="flex flex-col py-4">
        <li>
          <router-link :to="{name: 'My-Event'}" class="flex items-center p-4 hover:bg-gray-200">
            <i class="fa-regular fa-calendar"></i>
            <span class="ml-3">My Events</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{name: 'Create-Event'}" class="flex items-center p-4 hover:bg-gray-200">
            <i class="fa-regular fa-square-plus"></i>
            <span class="ml-3">Create Event</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="flex-grow p-6">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
