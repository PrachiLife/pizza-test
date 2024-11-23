<template>
  <StatusCard />
  <v-card
    flat 
    class="pa-3"
  >
    <v-data-table
      v-model:page="page"
      class="border-sm"
      :headers="headers"
      :items="allOrderDetails"
      :items-per-page="itemsPerPage"
    >
      <!-- status column -->
      <template #item.status="{ item }">
        <div class="text-center">
          <v-chip
            :color="getStatusColor(item.status)"
            :text="item.status.split('_').join(' ').toUpperCase()"
            class="text-uppercase"
            size="small"
            label
          />
        </div>
      </template>
  
      <!-- action column -->
      <template #item.actions="{ item }">
        <v-menu 
          close-on-content-click
          activator="parent"
          offset-y
        >
          <template #activator="{ props }">
            <v-icon
              class="me-2"
              size="small"
              v-bind="props"
            >
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <template 
              v-for="status in getAllOrderStatus"
              :key="status.name"
            >
              <v-list-item
                v-if="item.status !== status.name"
                :style="{color:getStatusColor(status.name)}"
                @click="updateOrderStatus(item, status)"
              >
                <v-list-item-title>{{ status.value }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const page = ref(1);
    const itemsPerPage = ref(10);
    const headers= [
      {
        align: 'start',
        key: 'name',
        title: 'Customer Name',
        sortable: false,
      },
      { title: 'Items Ordered', key: 'items_ordered', sortable: false, },
      { title: 'Total', key: 'total', sortable: false, },
      { align: 'center',title: 'Status', key: 'status', sortable: false, },
      { title: 'Actions', key: 'actions', sortable: false, },
    ];

    const OrderStatus = ref([{name:'order_received', value:'Order Received'},
    {name:'preparing', value:'Preparing'},
    {name:'ready_to_serve', value:'Ready To Serve'}])


    const allOrderDetails = computed(()=>store.getters.getOrderDetails);
    const pageCount = computed(()=> Math.ceil(allOrderDetails.value.length / itemsPerPage.value));
    const getAllOrderStatus = computed(()=>OrderStatus.value);
    
    const getStatusColor = (status)=>{
      if(status =='order_received') return 'green';
      else if(status=='ready_to_serve') return 'blue';
      return 'orange';
    }
    const updateOrderStatus = ({ id },status) =>{
      let payload = {
        id,
        name: status.name,
      }
      store.dispatch('setOrderStatus',payload);
    }

    return{
        page,
        itemsPerPage,
        headers,
        pageCount,
        allOrderDetails,
        getAllOrderStatus,
        getStatusColor,
        updateOrderStatus,
      }
    }
}
</script>
