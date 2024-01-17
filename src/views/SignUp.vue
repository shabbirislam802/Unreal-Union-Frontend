<script setup>
import {ref} from "vue";
import InputFieldText from "@/components/forms/InputFieldText.vue";
import InputFieldPassword from "@/components/forms/InputFieldPassword.vue";
import SuccessMessage from '@/components/utils/SuccessMessage.vue';
import ErrorMessage from '@/components/utils/ErrorMessage.vue';
import DataServices from "@/services/dataServices.js";

const username = ref('');
const password = ref('');
const isInputInvalid = ref(false);
const isSignUpSuccessful = ref(false);
const errorTexts = ref([]);

function signUp(){
  errorTexts.value = [];
  DataServices.signUpUser(username.value, password.value)
      .then(response=>{
        console.log(response);
        isInputInvalid.value = false;
        isSignUpSuccessful.value = true;
      })
      .catch(error=>{
        isInputInvalid.value = true;
        if(error.response.data[0]){
          Object.keys(error.response.data[0]).forEach(key=>{
            errorTexts.value.push({message: error.response.data[0][key][0]});
          });
        } else {
          errorTexts.value.push({message: "Invalid username or password or username is taken!"});
        }
      });
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="signUp" class="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
      <h2 class="mb-6 text-xl font-semibold text-gray-700">Sign Up</h2>

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

      <div class="mb-6" v-if="isSignUpSuccessful">
        <SuccessMessage
            successText="User was successfully created!"
            linkName="Sign-In"
            linkText="Sign in now."
        />
      </div>

      <div class="mb-6" v-if="isInputInvalid" v-for="errorText in errorTexts">
        <ErrorMessage
            :errorText="errorText.message"
        />
      </div>

      <button
          type="submit"
          class="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<style>
</style>