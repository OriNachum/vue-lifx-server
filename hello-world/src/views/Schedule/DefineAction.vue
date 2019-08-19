<template>
  <div class='define-action'>
    <div class='define-action--header'>
      Define action for: {{ supportedAction }}
    </div>
    <div class='define-action--form'>
      <div class='form--name'>
        Name: <input v-model="name"/>
      </div>
      <div>
        Parameters: <input v-model="parameters" />
      </div>
    </div>
    <button @click="defineAction({ name, supportedAction, parameters })">Define action</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  getters,
  actions,
} from '@/modules/schedule';

export default {
  name: 'defineAction',
  props: {
    supportedAction: '',
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
}
</script>

<style lang="scss">
.define-action--form {
  display: flex;
  flex-direction: column;
}
</style>