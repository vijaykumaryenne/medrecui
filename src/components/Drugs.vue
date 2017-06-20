<<template>
  <div class="page-layout">
    <md-card>
        <md-card-header>          
            <md-whiteframe md-elevation="3">
                <md-subheader class="md-accent">My Drugs</md-subheader>
            </md-whiteframe>
        </md-card-header>
        <md-card-content>   
          <md-list v-for="drug in drugDetailsList">
                <md-list-item>
                <md-icon>view_list</md-icon>
                <span>Drug Name : {{ drug.name }}</span>
                <md-list-expand>
                  <md-list>
                    <md-list-item class="md-inset">
                      <md-icon>sentiment_dissatisfied</md-icon>
                     <span> Side effect : {{ drug.sideeffects }}</span></md-list-item>
                    <md-list-item class="md-inset">
                      <md-icon>local_pharmacy</md-icon>
                     <span> Manufactured by : {{ drug.company }}</span>
                    <md-divider class="md-inset"></md-divider>
                    </md-list-item> 
                    <div align="right" class="row">
                      <md-button class="md-raised md-accent">Edit</md-button>
                      <md-button class="md-raised md-accent">Delete</md-button>                                   
                    </div>  
                  </md-list>
                </md-list-expand>
                </md-list-item>
            </md-list>
            <ul v-if="errors && errors.length">
              <li v-for="error of errors">
                {{error.message}}
              </li>
            </ul>
        </md-card-content>
    </md-card>     
    <md-card>
        <md-card-header>          
            <md-whiteframe md-elevation="3">
                <md-subheader class="md-accent">Add New Drug</md-subheader>
            </md-whiteframe>
        </md-card-header>
        <md-card-content>  
          <md-input-container>
                <label>Drug Name</label>
                <md-icon >comment</md-icon>
                <md-textarea placeholder="Drug label" v-model="drugDetails.drugName"  maxlength="70"></md-textarea>
            </md-input-container>  
            <md-input-container>
                <label>Side Effects</label>
                <md-icon class="primary">description</md-icon>
                 <md-textarea placeholder="Drug side effects" v-model="drugDetails.drugSideEffects"> </md-textarea>
            </md-input-container> 
            <md-input-container>
                <label>Manufactured By</label>
                <md-icon>description</md-icon>                
                <md-textarea placeholder="Company Name" v-model="drugDetails.drugCompanyName"></md-textarea>
            </md-input-container>
            <md-button class="md-raised md-accent" v-on:click.native="addDrug()">Add</md-button>            
        </md-card-content>
    </md-card>       
    
  </div>    
</template>
<<script>
import {HTTP} from '../http-common';
import store from '../store';
export default {
  name: 'drugslist',
  data: () => ({
      drugDetailsList: [],
      drugDetails: {
        drugName: '',
        drugSideEffects:'',
        drugCompanyName: ''
      },                               
      errors: []
  }),
  methods: {
    addDrug () {
                let addDrugDetails = this.drugDetails
                // We dispatch the appointment so it can be pushed
                // onto the appointments array
                if (Object.keys(addDrugDetails).length > 1) {
                    store.commit('drugListUpdate', addDrugDetails);                                       
                }                
                this.drugDetails = {
                    title: "",
                    detail: "",
                    date: ""
                };
    },
    
  },
  created() {
      HTTP.get('drugs')
      .then(response => {
        this.drugDetailsList = response.data;
        store.state.drugDetailsList; 
      })
      .catch(e => {
        this.errors.push(e)
      })      
  },
  computed: {
              drugsResult(){  
                  return store.state.drugDetailsList;
              }
            
            } 
  
 
}
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

