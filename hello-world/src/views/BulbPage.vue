<template>
  <div id="bulb-page" class='bulb-page'>
    BULB PAGE:
    <div v-if="isBulbDefined">
      {{ getLabel }}
      <div @click="toggleBulb()">
        Toggle
      </div>
      <div>
        <div>
           <input v-model="overtime">
        </div>
        <div v-if="overtime" @click="fadeToState({ newState: { brightness } , overtime })">
          click here to change bulb over {{ overtime }} seconds
        </div>
        <div v-else>
          input a number to toggle over time
        </div>
      </div>
      <div>
        Power: {{ getPower }}
      </div>
      <div>
        <div>
           <input v-model="brightness" :placeholder="getBrightness">
        </div>
        <div v-if="brightness !== getBrightness">
          On click, will change brightness to: {{ 100 * brightness }}%
        </div>
        <div v-else>
          input a different number to change state
        </div>
      </div>
      <div> Brightness: {{ getBrightness }}</div>
      <div> Temperature: {{ getTemperature }}</div>
      <div> Color Hue: {{ getHue }}</div>
      <div> Color Saturation: {{ getSaturation }}</div>
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
  getters,
  actions,
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
      brightness: 0,
    };
  },
  computed: {
    ...mapGetters(moduleName, {
      isBulbDefined: getters.IS_BULB_DEFINED,
      getLabel: getters.GET_LABEL,
      getPower: getters.GET_POWER,
      loading: getters.GET_LOADING,
      getLastActionResponse: getters.GET_LAST_ACTION_RESPONSE,
      getBrightness: getters.GET_BRIGHTNESS,
      getTemperature: getters.GET_TEMPERATURE,
      getHue: getters.GET_HUE,
      getSaturation: getters.GET_SATURATION,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      toggleBulb: actions.TOGGLE_BULB,
      init: actions.INIT,
      fadeToState: actions.FADE_TO_STATE,
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
