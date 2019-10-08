<template>
  <div class='action-definition'>
    <div class='action-definition action-definition--name'>
      <div v-if="readonly">
        Name: {{ actionDefinition.Name }}
        <v-Select
          v-model="actionDefinition.Name"
          :options="getSupportedActions"
          @input="updateActionDefinitionName"/>
      </div>
      <div v-else>
        Name: <input v-model="actionDefinition.Name" />
      </div>
    </div>
    <div class='action-definition action-definition--service'>
      <div v-if="readonly">
        Service: {{ actionDefinition.Service }}
      </div>
      <div v-else>
        Service: <v-Select
                    v-model="actionDefinition.Service"
                    :options="getSupportedServices"
                    @input="updateActionIds"/>
      </div>
    </div>
    <div class='action-definition action-definition--action-id'>
      <div v-if="readonly">
        ActionId: {{ actionDefinition.ActionId }}
      </div>
      <div v-else>
        ActionId: <v-Select v-model="actionDefinition.ActionId" :options="supportedActionsForService" ></v-Select>
      </div>
    </div>
    <div v-if="readonly">
      <div class='action-definition action-definition--parameters' v-if="actionDefinition.Parameters && actionDefinition.Parameters.length > 0">
        Parameters: 
        <div class='action-definition--parameters parameters--parameter' v-for="parameter in this.actionDefinition.Parameters" :key="parameter[0]">
          {{ parameter[0] }}: {{ parameter[1] }}
        </div>
      </div>
    </div>
    <div v-else>
      Parameters: 
      <div class='action-definition--parameters parameters--parameter' v-for="parameter in this.actionDefinition.Parameters" :key="parameter[0]">
        {{ parameter[0] }}: <input v-model="parameter[1]" /> <button @click="removeParameter(parameter[0])">Remove</button>
      </div>
      <div>
        <input v-model="newParameter" /><button @click="addParameter(newParameter)">Add parameter</button>
      </div>  
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  actions,
} from '@/modules/schedule';

import vSelect from 'vue-select';

export default {
  name: 'action-definition',
  components: {
    vSelect,
  },
  data() {
    return {
      newParameter: '',
      supportedActionsForService: [],
    };
  },
  props: {
    actionDefinition: Object,
    readonly: Boolean,
    supportedActions: Object,
    definedActions: Array,
    value: Object,
  },
  computed: {
    getSupportedServices() {
      const allEntires = Object.entries(this.supportedActions)[0];
      const actualServices = allEntires.filter(x => !Array.isArray(x));
      return actualServices;
    },
    getSupportedActions() {
      const definedActionsNames = this.definedActions.map(x => x.Name);
      return definedActionsNames;
    }
  },
  methods: {
    updateActionDefinitionName(actionDefinitionName) {
      const chosenAction = this.definedActions.find(x => x.Name === actionDefinitionName);
      this.actionDefinition.Service = chosenAction.Service;
      this.actionDefinition.ActionId = chosenAction.ActionId;
      this.actionDefinition.Parameters = Object.entries(chosenAction.Parameters);
    },
    updateActionIds(service) {
      if (!this.actionDefinition) {
        this.supportedActionsForService = [];
        return;
      }
      if (!this.actionDefinition.Service) {
        this.supportedActionsForService = [];
        return;
      }
      this.supportedActionsForService = this.supportedActions[this.actionDefinition.Service];
    },
    addParameter(parameterName) {
      const newParameter = [ parameterName, ''];
      this.actionDefinition.Parameters.push(newParameter);
    },
    removeParameter(parameterName) {
      const indexOfParameter = this.actionDefinition.Parameters.findIndex(x => x[0]===parameterName);
      this.actionDefinition.Parameters.splice(indexOfParameter, 1);
    }
  }
};
</script>

<style>
.parameters--parameter {    
  margin-left:1em;
}
</style>