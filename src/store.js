import Vuex from 'vuex'
import Vue from 'vue'
import {HTTP} from './http-common';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    timeEntries: [],
    totalTime: 0,
    appointments: [],
    drugs: []
  },
  mutations: {
    timeUpdate(state,timeEntry) {
      state.totalTime += Number(timeEntry.totalTime);
      state.timeEntries.push(timeEntry);
    },
    appointmentUpdate(state,appointment){
      state.appointments.push(appointment);
    },
    deleteTime(state,timeEntry) {
      let index = state.timeEntries.indexOf(timeEntry);
      state.timeEntries.splice(index, 1);
      state.totalTime -= timeEntry.totalTime;
    },
    deleteAppointment(state,appointment) {
      let index = state.appointments.indexOf(appointment);
      state.appointments.splice(index, 1);      
    },
    drugInventoryUpdate(state,drugInfoData){
      state.drugs.push(drugInfoData);
      
    },
      SET_DRUG_LIST: (state, { list }) => {
      state.drugs = list
    }
  },
  actions: {
    LOAD_DRUG_LIST: function ({ commit }) {
      HTTP.get('drugs').then((response) => {
        commit('SET_DRUG_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  }
})

export default store