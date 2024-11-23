<template>
  <v-container>
    <v-row>
      <v-col 
        v-for="(detail, i) in statusDetails"
        :key="i"
        cols="6"
        md="3"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          color="grey-lighten-4"
        >
          <template #title>
            <div class="text-button text-md-h6 font-weight-medium text-truncate">
              {{ detail.name.split("_").join(" ").toUpperCase() }}
            </div>
          </template>
          <template #text>
            <div class="text-body-1 text-md-h6 text-center font-weight-medium text-grey-darken-1">
              {{ detail.total }}
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        const statusDetails= ref();

        const allOrderDetails = computed(()=> store.getters.getOrderDetails);
        
        // to get all status details array from the list of allOrderDetails
        const getStatusDetails = ()=>{
          statusDetails.value = Object.entries(
          allOrderDetails.value.reduce((acc, curr) => {
              acc.total_orders = (acc.total_orders || 0) + 1;
              acc[curr.status] = (acc[curr.status] || 0) + 1;
              return acc;
          }, {})
          ).map(([name, total]) => ({ name, total })).sort((a,b)=>b.name.localeCompare(a.name));
        }

        watch(()=>allOrderDetails.value,()=>{
            getStatusDetails();
        },{deep:true})

        onMounted(()=>{
            getStatusDetails();
        })

        return {
            statusDetails,
            allOrderDetails,
        }
    }
}
</script>