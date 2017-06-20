import Vuex from 'vuex'
import Vue from 'vue'
import {HTTP} from './http-common';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    timeEntries: [],
    totalTime: 0,
    appointments: [],
    drugDetailsList: [],
    drugsInfo: []
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
    drugListUpdate(state,drugData){      
        HTTP.post('drugs',{
              "company": drugData.drugCompanyName,
              "name": drugData.drugName,
              "sideeffects": drugData.drugSideEffects   
        })
        .then(response => {
          console.log(response);          
        })
        .catch(e => {
          this.errors.push(e)
        })
        state.drugDetailsList.push(drugData);
      },
      SET_DRUGSINFO_LIST: (state, { list }) => {
      state.drugsInfo = list
    },
    ADD_PROJECT: (state, { drugsData }) => {
      state.projects.push(drugsData)
    }
  },
  actions: {
    LOAD_DRUGSINFO_LIST: function ({ commit }) {
      HTTP.get('drugs').then((response) => {
        commit('SET_DRUGSINFO_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_DRUG_INFO: function ({ commit }) {
      HTTP.post('drugs').then((response) => {
        commit('ADD_DRUGS', { drugsData: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  }
})

export default store