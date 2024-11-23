import { createStore } from "vuex";
import data from "@/data/OrderDetails.json";

export default createStore({
    state:{
        orderDetails: data,
    },
    getters: {
        getOrderDetails(state){
            return state.orderDetails;
        }
    },
    mutations:{
        SET_ORDER_STATUS(state, payload) {
            let { id , name} = payload;
            state.orderDetails.forEach(order => {
                if(order.id === id) {
                    order.status = name;
                }
            });
        }
    },
    actions:{     
        setOrderStatus({commit}, payload){
            commit('SET_ORDER_STATUS', payload);
        } 
    }
})