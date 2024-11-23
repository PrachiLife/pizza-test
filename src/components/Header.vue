<template>
  <v-app-bar 
    app 
    height="60" 
    color="grey-lighten-4" 
    flat
  >
    <v-app-bar-title>Pizza App</v-app-bar-title>
  
    <template #append>
      <v-btn 
        v-if="route.name !=='/login'"
        @click="logout"
      >
        LOGOUT<v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>
  
<script setup>
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const logout = ()=>{
    localStorage.removeItem('userDetails');
    router.push('/login');
}
</script>