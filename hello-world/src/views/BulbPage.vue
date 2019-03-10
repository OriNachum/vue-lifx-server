<template>
  <div id="bulb-page" class='bulb-page'>
    BULB PAGE:
    <div v-if="isBulbDefined">
      {{ getLabel }}
      <div @click="toggleBulb()">Toggle</div>
      <div>
        <div>
           <input v-model="overtime">
        </div>
        <div v-if="overtime" @click="toggleBulb(overtime)"> 
          click here to toggle over {{ overtime }} seconds 
        </div>
        <div v-else>
          input a number to toggle over time
        </div>
      </div>
      <div> Power: {{ getPower }}</div>
    </div>
    <div v-else>
      No bulb defined, return to main page.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  INIT,
  GET_LABEL,
  GET_POWER,
  IS_BULB_DEFINED,
  GET_LOADING,
  TOGGLE_BULB,
  GET_LAST_ACTION_RESPONSE,
} from '@/modules/bulbPage';

export default {
  name: 'bulbPage',
  props: {
    bulb: {
      address: '0.0.0.0',
      brightness: '1',
      colorHue: '38',
      colorSaturation: '0',
      label: 'label',
      lastVerifiedState: 'none',
      power: '0',
      product: '0',
      stateVerificationTimeUtc: 'now',
      temperature: '3500',
      version: '1',
    },
  },
  data() {
    return {
      overtime: 0,
    };
  },
  computed: {
    ...mapGetters(moduleName, {
      isBulbDefined: IS_BULB_DEFINED,
      getLabel: GET_LABEL,
      getPower: GET_POWER,
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
    if (this && this.$props.bulb) {
      this.init(this.$props.bulb);
    }
  },
};
// Put here how to design each light in a page
</script>
