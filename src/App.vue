<template>
 
   
      
<div class="md-theme-purple">
       
  <md-toolbar  class="md-accent">
    
  <md-menu md-align-trigger md-size="5">
  <md-button class="md-dense" md-menu-trigger><md-icon class="md-primary" md-theme="green" >dashboard</md-icon>Medrec App</md-button>

  <md-menu-content>
    <md-menu-item><router-link class="md-transperent" tag="md-button" to="/"><md-icon>home</md-icon><a>Home</a></router-link></md-menu-item>
    <md-menu-item><router-link class="md-transperent" tag="md-button" to="/time-entries"><md-icon>note_add</md-icon><a>Time Entries</a></router-link></md-menu-item>
    <md-menu-item><router-link class="md-transperent" tag="md-button" to="/appointment-entries"><md-icon>event</md-icon><a>Appointments</a></router-link></md-menu-item>
    <md-menu-item><router-link class="md-transperent" tag="md-button" to="/drugs-inventory"><md-icon>donut_small</md-icon><a>Drugs Inventory</a></router-link></md-menu-item>
    <md-menu-item><router-link class="md-transperent" tag="md-button" to="/physicians-list"><md-icon>people</md-icon><a>Physicians List</a></router-link></md-menu-item>
  </md-menu-content>
</md-menu>
            <router-link class="md-raised" tag="md-button" to="/appointment-entries"><a>Appointments</a></router-link>
           
            
            
            
            
      
  </md-toolbar>
 

      
     
    <main class="mdl-layout__content">
      <div class="page-content">
        <div v-if="$route.path == '/time-entries'">
          <sidebar :time="totalTime"></sidebar>
        </div>
        <div v-else-if="$route.path == '/'">
          <sidebar :time="totalTime"></sidebar>
        </div>
        <div v-else-if="$route.path == '/log-time'">
          <sidebar :time="totalTime"></sidebar>
        </div>

        <router-view></router-view>

      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import store from './store';

export default {
  components: {'sidebar': Sidebar},
  computed: {
    totalTime() {
      return store.state.totalTime;
    }
  }
};


</script>


<style>
.page-layout {
  margin: 16px 5%;
  display: flex;

  .column {
    flex: 1;

    + .column {
      margin-left: 8px;
    }
  }

  .md-card + .md-card {
    margin-top: 8px;
  }
}
</style>
