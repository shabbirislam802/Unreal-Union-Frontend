<script setup>
import {ref, onMounted} from 'vue';
import DataServices from "@/services/dataServices.js";
import User from '@/helper/user.js';

const createdEvents = ref([]);
const joinedEvents = ref([]);

onMounted(() => {
  DataServices.getSelfCreatedEvents(User.getUserId())
      .then(response => {
        createdEvents.value = response.data.data.map(event => ({
          id: event.eventId,
          name: event.name,
          description: event.description,
          date: new Date(event.date),
          location: event.location,
          image: event.imagePath,
          attendees: event.participationLimit
        }));
      })
      .catch(error => {
      });

  DataServices.getRegisteredEvents(User.getUserId())
      .then(response => {
        joinedEvents.value = response.data.data.map(event => ({
          id: event.eventId,
          name: event.name,
          description: event.description,
          date: new Date(event.date),
          location: event.location,
          image: event.imagePath,
          attendees: event.participationLimit
        }));
      })
      .catch(error => {
      });
});

function unregisterEvent(eventId) {
  DataServices.unregisterEvent(User.getUserId(), eventId)
      .then(() => {
        joinedEvents.value = joinedEvents.value.filter(event => event.id !== eventId);
      })
      .catch(error => {
        console.error("Error unregistering event:", error);
      });
}
</script>

<template>
  <div class="container mx-auto p-1 ms:p-8">
    <div class="mb-10">
      <h2 class="text-2xl font-bold mb-5">My Events</h2>
      <div v-if="createdEvents.length === 0" class="text-gray-600">
        You haven't created any events.
      </div>
      <div class="flex flex-wrap">
        <div v-for="event in createdEvents" :key="event.id" class="flex flex-col w-full md:w-1/2 lg:w-1/3 p-4">
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img :src="event.image" alt="Event Bild" class="w-full h-32 object-cover">
            <div class="p-4">
              <h3 class="font-bold text-lg">{{ event.name }}</h3>
              <p class="text-sm text-gray-600">{{ event.description }}</p>
              <p class="text-sm text-gray-600"><b>Location:</b> {{ event.location }}</p>
              <p class="text-sm text-gray-600"><b>Date:</b> {{ new Date(event.date).toLocaleDateString() }}</p>
              <p class="text-sm text-gray-600"><b>Remaining spots:</b> {{ event.attendees }}</p>
              <router-link :to="{name: 'Create-Event', params: {id: event.id}}">
                <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-5">Participating Events</h2>
      <div v-if="joinedEvents.length === 0" class="text-gray-600">
        You are not participating in any events.
      </div>
      <div class="flex flex-wrap">
        <div v-for="event in joinedEvents" :key="event.id" class="flex flex-col w-full md:w-1/2 lg:w-1/3 p-4">
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img :src="event.image" alt="Event Bild" class="w-full h-32 object-cover">
            <div class="p-4">
              <h3 class="font-bold text-lg">{{ event.name }}</h3>
              <p class="text-sm text-gray-600">{{ event.description }}</p>
              <p class="text-sm text-gray-600"><b>Location:</b> {{ event.location }}</p>
              <p class="text-sm text-gray-600"><b>Date:</b> {{ new Date(event.date).toLocaleDateString() }}</p>
              <router-link :to="{name: 'Event', params: {id: event.id}}"
                           class="flex justify-center mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                More Details
              </router-link>
              <button @click="unregisterEvent(event.id)"
                      class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>