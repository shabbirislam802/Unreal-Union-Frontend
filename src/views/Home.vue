<script setup>
import {ref, onMounted} from 'vue';
import DataServices from "@/services/dataServices.js";

const events = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');

onMounted(() => {
  getAllEvents();
});

function getAllEvents(){
  events.value = [];
  DataServices.getAllEvents()
      .then(response => {
        Object.keys(response.data.data).forEach(key => {
          events.value.push({
            id: response.data.data[key]['eventId'],
            name: response.data.data[key]['name'],
            description: response.data.data[key]['description'],
            date: new Date(response.data.data[key]['date']),
            location: response.data.data[key]['location'],
            image: response.data.data[key]['imagePath'],
            attendees: response.data.data[key]['participationLimit']
          });
        });
      })
      .catch(error => {});
}

function filterEventsByName() {
  events.value = [];
  DataServices.getEventByName(searchQuery.value)
      .then(response => {
        Object.keys(response.data.data).forEach(key => {
          events.value.push({
            id: response.data.data[key]['eventId'],
            name: response.data.data[key]['name'],
            description: response.data.data[key]['description'],
            date: new Date(response.data.data[key]['date']),
            location: response.data.data[key]['location'],
            image: response.data.data[key]['imagePath'],
            attendees: response.data.data[key]['participationLimit']
          });
        });
      })
      .catch(error => {});
}

function filterEventsByCategory() {
  events.value = [];
  DataServices.getEventListByCategory(selectedCategory.value)
      .then(response => {
        Object.keys(response.data.data).forEach(key => {
          events.value.push({
            id: response.data.data[key]['eventId'],
            name: response.data.data[key]['name'],
            description: response.data.data[key]['description'],
            date: new Date(response.data.data[key]['date']),
            location: response.data.data[key]['location'],
            image: response.data.data[key]['imagePath'],
            attendees: response.data.data[key]['participationLimit']
          });
        });
      })
      .catch(error => {});
}
</script>


<template>
  <div class="container mx-auto p-8">
    <div class="flex flex-col mb-6">
      <div class="mb-4">
        <input
            type="text"
            placeholder="Search Events..."
            class="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            v-model="searchQuery"
            @input="filterEventsByName()"
        />
      </div>
      <div class="flex flex-wrap items-center mb-6">
        <div class="w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <select
              class="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              v-model="selectedCategory" @change="filterEventsByCategory()">
            <option disabled value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
            <option value="Food">Food</option>
            <option value="Business">Business</option>
            <option value="Networking">Networking</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="getAllEvents()">
          Clear
        </button>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div v-for="event in events" :key="event.id" class="flex flex-col w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <img :src="event.image" alt="Event Image" class="w-full h-32 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-lg">{{ event.name }}</h3>
            <p class="text-sm text-gray-600"><b>Location:</b> {{ event.location }}</p>
            <p class="text-sm text-gray-600"><b>Date:</b> {{ new Date(event.date).toLocaleDateString() }}</p>
            <p class="text-sm text-gray-600"><b>Remaining spots:</b> {{ event.attendees }}</p>
            <router-link :to="{name: 'Event', params: {id: event.id}}" class="flex justify-center mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              More Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
