<template>
  <v-sheet 
    class="mx-auto pa-4 d-flex flex-column justify-center"
    width="400"
    height="100%"
  > 
    <div class="w-50 h-20 align-self-center">
      <v-img src="../assets/pizza-logo.jpg" />
    </div>
    <v-form 
      v-model="loginForm" 
      class="border-thin pa-6 rounded-sm"
      @submit.prevent="submitLoginForm()"
    >
      <v-text-field
        v-model="loginDetials.name"
        label="Name"
        required
        variant="filled"
        :rules="[!!loginDetials.name || 'Field is required']"
      />

      <v-text-field
        v-model="loginDetials.password"
        label="Password"
        required
        variant="filled"
        :rules="[!!loginDetials.password || 'Field is required']"
      />

      <v-btn
        class="mt-4"
        color="black"
        block
        type="submit"
      >
        LOGIN
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { ref } from 'vue';
import router from '@/router';
  export default {
    setup() {
        const loginDetials = ref({});
        const loginForm = ref(false);

        const submitLoginForm = async () =>{
            if (!loginForm.value) return
            localStorage.setItem('userDetails',JSON.stringify(loginDetials.value))
            router.push('/');
        }
        return {
            loginDetials,
            loginForm,
            submitLoginForm,
        }
    }
  }
</script>