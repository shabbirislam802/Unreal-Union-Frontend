<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
import InputFieldText from "@/components/forms/InputFieldText.vue";
import InputFieldPassword from "@/components/forms/InputFieldPassword.vue";
import ErrorMessage from '@/components/utils/ErrorMessage.vue';
import DataServices from "@/services/dataServices.js";

const store = useStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const isAuthError = ref(false);
const errorTexts = ref([]);


function signIn() {
  errorTexts.value = [];
  DataServices.signInUser(username.value, password.value)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          store.dispatch('signIn');
          isAuthError.value = false;
          sessionStorage.setItem('user', JSON.stringify(response.data));
          router.push('/profile/my-events')
        }
      })
      .catch(error => {
        isAuthError.value = true
        if(error.response.data.errors){
          Object.keys(error.response.data.errors).forEach(key=>{
            errorTexts.value.push({message: error.response.data.errors[key][0]});
          });
        } else {
          errorTexts.value.push({message: "Invalid username or password!"});
        }
      });
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="signIn" class="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
      <h2 class="mb-6 text-xl font-semibold text-gray-700">Sign In</h2>

      <div class="mb-4">
        <InputFieldText
            label="Username"
            inputID="input-username"
            inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            v-model="username"
        />
      </div>

      <div class="mb-6">
        <InputFieldPassword
            label="Password"
            inputID="input-password"
            minLength=8
            v-model="password"
        />
      </div>

      <div class="mb-6" v-if="isAuthError" v-for="errorText in errorTexts">
        <ErrorMessage
            :errorText="errorText.message"
        />
      </div>

      <button
          type="submit"
          class="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  </div>
</template>


<style>
</style>