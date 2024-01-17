<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import SuccessMessage from '@/components/utils/SuccessMessage.vue';
import ErrorMessage from '@/components/utils/ErrorMessage.vue';
import StarRating from "@/components/utils/StarRating.vue";
import DataServices from "@/services/dataServices.js";
import User from '@/helper/user.js';

const route = useRoute();
const router = useRouter();
const successMessage = ref('');
const errorMessage = ref('');
const eventData = ref({
  id: route.params.id,
  name: '',
  description: '',
  location: '',
  date: '',
  image: '',
  attendees: 0,
  rating: 0
});
const isSignedIn = ref(false);
const isSubscribed = ref(false);

onMounted(() => {
  if (User.getUserId()) {
    isSignedIn.value = true;
  }

  DataServices.getEventById(route.params.id)
      .then(response => {
        if (response.data) {
          eventData.value.id = response.data.data['eventId'];
          eventData.value.name = response.data.data['name'];
          eventData.value.description = response.data.data['description'];
          eventData.value.date = response.data.data['date'];
          eventData.value.location = response.data.data['location'];
          eventData.value.image = response.data.data['imagePath'];
          eventData.value.attendees = response.data.data['participationLimit']
        }
      })
      .catch(error => {

      });
});

watch(eventData, () => {
  checkSubscriptionStatus();
});

function checkSubscriptionStatus() {
  if (isSignedIn.value) {
    DataServices.getRegisteredEvents(User.getUserId())
        .then(response => {
          if (response.data.some(event => event.id === eventData.value.id)) {
            isSubscribed.value = true;
          }
        })
        .catch(error => {});
  }
}


function subscribeEvent() {
  const data = {userId: User.getUserId(), eventId: route.params.id}
  DataServices.registerEvent(data)
      .then(response => {
        successMessage.value = 'Subscription successfully!';
        errorMessage.value = '';
      })
      .catch(error => {
        errorMessage.value = 'Failed to subscribe.';
        successMessage.value = '';
      });
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="container mx-auto p-8">
    <button @click="goBack"
            class="mb-5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <span>Back</span>
    </button>

    <div class="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <img :src="eventData.image" alt="Event Image" class="w-full h-64 object-cover mb-6">
      <h2 class="text-2xl font-bold mb-2">{{ eventData.name }}</h2>
      <p class="text-gray-700 mb-4">{{ eventData.description }}</p>
      <p class="text-gray-600 mb-2"><strong>Location:</strong> {{ eventData.location }}</p>
      <p class="text-gray-600 mb-2"><strong>Date:</strong> {{ new Date(eventData.date).toLocaleDateString() }}</p>
      <p class="text-gray-600 mb-4"><strong>Remaining spots:</strong> {{ eventData.attendees }}</p>

      <div class="flex items-center mb-4">
        <star-rating :rating="eventData.rating"></star-rating>
      </div>

      <div v-if="isSignedIn">
        <button v-if="!isSubscribed" @click="subscribeEvent"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Subscribe
        </button>
        <SuccessMessage v-if="successMessage" :successText="successMessage"/>
        <ErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
      </div>
    </div>
  </div>
</template>

