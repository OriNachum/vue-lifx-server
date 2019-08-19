<template>
  <div id="bulb-page" class='bulb-page'>
    <div v-if="isBulbDefined">
      <div class='bulb-controller'>
        <div>
          Bulb Name: {{ getLabel }}
        </div>
        <div class='loading'>
          <div v-if="!loading" @click="refreshBulb()">
            Press to Refresh
          </div>
          <div v-else>
            Loading...
          </div>
        </div>
        <div>
          <button v-if="getPower" @click="toggleBulb()">Toggle off</button>
          <button v-else @click="toggleBulb()">Toggle on</button>
        </div>
        <div class='state-properties'>
          <div>Power: {{ getPower }}</div>
          <div>Brightness: {{ getBrightness }}%</div>
          <div>Temperature: {{ getTemperature }}</div>
          <div>Color Hue: {{ getHue }}</div>
          <div>Color Saturation: {{ getSaturation }}%</div>
        </div>
        <div class='input'>
          <div class='input-overtime'>
            <div>
              Fade In: <input v-model="overtime" placeholder='fade in time in milliseconds'>
            </div>
          </div>
          <div class='input-brightness'>
            <slide-bar
              v-model="brightness"
              :min="0"
              :max="100">
            </slide-bar>
            <button @click="setBrightness({ brightness, overtime })">Set Brightness</button>
          </div>
          <div class='input-temperature'>
            <slide-bar
              v-model="temperature"
              :min="2500"
              :max="9000">
            </slide-bar>
            <button @click="setTemperature({ temperature, overtime })">Set Temperature</button>
          </div>
          <div class='input-saturation'>
            <slide-bar
              v-model="saturation"
              :min="0"
              :max="100"
              @input="setSaturation">
            </slide-bar>
          </div>
          <div class='input-hue'>
            <color-picker
              v-bind="getColor"
              variant='persistent'
              @input="onInput"
              @change="onChange">
            </color-picker>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No bulb defined, return to main page.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ColorPicker from '@radial-color-picker/vue-color-picker';
import SlideBar from 'vue-slide-bar';
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
      hue: '38',
      saturation: '0',
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
      temperature: 0,
      saturation: 0,
    };
  },
  components: {
    ColorPicker,
    SlideBar,
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
      getColor: getters.GET_COLOR,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      refreshBulb: actions.REFRESH_BULB,
      toggleBulb: actions.TOGGLE_BULB,
      init: actions.INIT,
      fadeToState: actions.FADE_TO_STATE,
      setBrightness: actions.SET_BRIGHTNESS,
      setTemperature: actions.SET_TEMPERATURE,
      setHue: actions.SET_HUE,
      setSaturation: actions.SET_SATURATION,
      setColor: actions.SET_COLOR,
      // init: INIT,
    }),
    onInput(hue) {
      const { overtime } = this;
      this.setColor({ hue, overtime });
    },
    // Emitted when the user dismisses the color picker
    // (i.e. interacting with the middle color well).
    onChange(hue) {
      this.setHue(hue);
    },
  },
  mounted() {
    if (this && this.$props.bulb) {
      this.init(this.$props.bulb);
      this.temperature = this.getTemperature;
      this.brightness = this.getBrightness;
      this.saturation = this.getSaturation;
    }
  },
};
</script>

<style lang="scss">
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2c3e50;
    margin-top: 40px;
}

h1 {
    font-weight: normal;
}

pre {
    min-width: 275px;
    padding: 15px 30px;
    background: #f8f8f8;
    color: #525252;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 420px) {
    h1 {
        font-size: 1.4em;
    }
}
</style>
