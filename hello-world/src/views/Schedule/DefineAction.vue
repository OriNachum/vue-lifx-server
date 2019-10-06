<template>
  <div class='define-action'>
    <action-definition :actionDefinition="definedAction" :supportedActions="supportedActions"></action-definition>
    <!-- <div class='define-action--header'>
      Define action for: {{ supportedAction }}
    </div>
    <div class='define-action--form'>
      <div class='form--name'>
        Name: <input v-model="name"/>
      </div>
      <div>
        Parameters: <input v-model="parameters" />
      </div>
    </div> -->
    <button @click="defineAction(definedAction)">Define action</button>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import { mapGetters, mapActions } from 'vuex';
import ActionDefinition from '@/components/ActionDefinition.vue';

import {
  moduleName,
  actions,
} from '@/modules/schedule';

import vSelect from 'vue-select';

export default {
  name: 'defineAction',
  components: {
    vSelect,
    ActionDefinition,
  },
  props: {
    definedAction: Object,
    supportedActions: Object,
  },
  data() {
    return {
      name: '',
      parameters: '',
    };
  },
  computed: {
    ...mapGetters(moduleName, {
      // defineAc: getters.GET_SUPPORTEDACTIONS,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      defineAction: actions.DEFINE_ACTION,
    }),
  },
};
</script>

<style lang="scss">
.define-action--form {
  display: flex;
  flex-direction: column;
}
</style>
