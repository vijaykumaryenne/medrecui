// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 			from 'vue'
import App 			from './App'
import Home 		from './components/Home'
import TimeEntries 	from './components/TimeEntries'
import LogTime 		from './components/LogTime'
import Appointments from './components/Appointments'
import Drugs from './components/Drugs'
import Physicians from './components/Physicians'
import DrugsInfo from './components/DrugsInfo'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import VueRouter 	from 'vue-router'
import VueResource 	from 'vue-resource'


Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMaterial) 

const router = new VueRouter({
	routes: [
		{ path: '/', component: Home},
		{ path: '/home', component: Home},
		{ path: '/time-entries', component: TimeEntries,
			children: [
				{
					path: 'log-time',
					component: LogTime
				}
			]
		},
		{ path: '/appointment-entries', component: Appointments},
		{ path: '/drugs-inventory', component: Drugs},
		{ path: '/physicians-list', component: Physicians},
		{ path: '/drugsInfo', component: DrugsInfo},
		{ path: '*', redirect: '/home'}
	],
	mode: 'history' 
})

var bus = new Vue({});

/* eslint-disable no-new */
const app = new Vue({
	router,
	data: {
		bus: bus
	},
	render: h => h(App)
}).$mount('#app')
