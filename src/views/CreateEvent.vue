<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import SuccessMessage from '@/components/utils/SuccessMessage.vue';
import ErrorMessage from '@/components/utils/ErrorMessage.vue';
import DataServices from "@/services/dataServices.js";
import User from '@/helper/user.js';


const route = useRoute();
const successMessage = ref('');
const errorMessage = ref('');

const eventData = ref({
  id: '',
  name: '',
  description: '',
  location: '',
  date: '',
  category: '',
  participationLimit: 1,
  image: null,
  imageSrc: '',
  creatorUserId: User.getUserId(),
});

onMounted(() => {
  if (route.params.id) {
    DataServices.getEventById(parseInt(route.params.id))
        .then(response => {
          if (response.data){
            eventData.value.id = route.params.id;
            eventData.value.name = response.data.data['name'];
            eventData.value.description = response.data.data['description'];
            eventData.value.location = response.data.data['location'];
            eventData.value.date = response.data.data['date'];
            eventData.value.category = response.data.data['category'];
            eventData.value.participationLimit = response.data.data['participationLimit']
            eventData.value.image = response.data.data['imagePath'];
            eventData.value.imageSrc = response.data.data['imagePath'];
          }
          console.log(response.data.data.id)
        }).catch(error => {
    });
  }
});

function submitForm() {
  const isUpdating = eventData.value.id;
  const submitAction = isUpdating ? DataServices.updateEvent : DataServices.createEvent;

  submitAction(eventData.value)
      .then(response => {
        successMessage.value = 'Event submitted successfully!';
        errorMessage.value = '';
      })
      .catch(error => {
        errorMessage.value = 'Failed to submit the event.';
        successMessage.value = '';
      });
}
function onImageChange(e) {
  const file = e.target.files[0];
  eventData.value.image = file;
  eventData.value.imageSrc = URL.createObjectURL(file);
}
</script>

<template>
  <div class="container mx-auto p-8">
    <form @submit.prevent="submitForm" class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-name">
            Event Name
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="event-name" type="text" placeholder="Enter event name" v-model="eventData.name">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-description">
            Description
          </label>
          <textarea
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="event-description" placeholder="Enter event description" v-model="eventData.description" maxlength="300"></textarea>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-location">
            Location
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-location" type="text" placeholder="Enter event location" v-model="eventData.location">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-date">
            Event Date
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-date" type="datetime-local" v-model="eventData.date">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-category">
            Category
          </label>
          <select
              class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-category" v-model="eventData.category">
            <option disabled value="">Please select one</option>
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
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-participationLimit">
            Attendees Number
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-participationLimit" type="number" min="1" v-model="eventData.participationLimit">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="event-image">
            Event Image
          </label>
          <img v-if="eventData.image" :src="eventData.imageSrc" alt="Current event image" class="w-full h-32 object-cover mb-3">
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="event-image" type="file" @change="onImageChange">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">

          <SuccessMessage v-if="successMessage" :successText="successMessage"/>
          <ErrorMessage v-if="errorMessage" :errorText="errorMessage"/>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded" type="submit">
            Submit Event
          </button>
        </div>
      </div>
    </form>
  </div>
</template>