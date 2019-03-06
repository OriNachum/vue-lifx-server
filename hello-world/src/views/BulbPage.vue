<template>
  <div id="bulb-page" class='bulb-page'>
    BULB PAGE:
    <div v-if="bulb && bulb.label">
      {{ bulb.label }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  INIT,
  GET_LABEL,
  GET_LOADING,
  TOGGLE_BULB,
  GET_LAST_ACTION_RESPONSE,
} from '@/modules/bulbPage';

export default {
  name: 'bulbPage',
  props: ['bulb'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(moduleName, {
      getLabel: GET_LABEL,
      loading: GET_LOADING,
      getLastActionResponse: GET_LAST_ACTION_RESPONSE,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      toggleBulb: TOGGLE_BULB,
      init: INIT,
      // init: INIT,
    }),
  },
  mounted() {
    if (this && this.$props && this.$props.label) {
      this.init(this.$props.label);
    }
  },
};
// Put here how to design each light in a page
</script>
