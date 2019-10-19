<template>
<div class='bulb'>
  <p>
    <div class='bulb__toggle-icon' @click="toggleBulb(bulb)">
      <font-awesome-icon :icon="getBulbIconState"></font-awesome-icon>
    </div>
    <div class='bulb__text' @click="routeToBulbPage(bulb)">
      <!--<router-link :to="{ name: 'bulb', params: { bulb } }">-->
        label: {{ bulb.label }}; address: {{ bulb.address }}
      <!--</router-link>-->
    </div>
  </p>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import {
  moduleName,
  REFRESH_BULBS,
  GET_BULBS,
  GET_LOADING,
  TOGGLE_BULB,
  GET_LAST_ACTION_RESPONSE,
} from '@/modules/mainPage';


export default {
  name: 'bulb',
  props: {
    bulb: Object,
  },
  data() {
    return {

      /*
     bulb: {
        Label: '',
        Address: '',
        Product: '',
        Version: '',
        Power: '',
        Temperature: '',
        Brightness: '',
        ColorHue: '',
        ColorSaturation: '',
        LastVerifiedState: '',
        StateVerificationTimeUtc: '',
      },
      */
    };
  },

  computed: {
    ...mapGetters(moduleName, {
      getBulbs: GET_BULBS,
      loading: GET_LOADING,
      getLastActionResponse: GET_LAST_ACTION_RESPONSE,
    }),
    getBulbIconState() {
      let iconState = 'fas';
      if (this.bulb.power) {
        iconState = 'far';
      }
      return [iconState, 'lightbulb'];
    },
  },
  methods: {
    ...mapActions(moduleName, {
      toggleBulb: TOGGLE_BULB,
      // init: INIT,
    }),
    showError: () => this && this.computed
      && this.computed.getLastActionResponse().responseType !== 0
      && (this.computed.getLastActionResponse().responseData),
    routeToBulbPage(bulb) {
      this.$router.push({
        name: 'bulb',
        params: { bulb },
      });
      // const routeData =
      //  this.$router.resolve({ name: 'bulbPage', component: BulbPage, params: { bulb } });
      // window.open(routeData.href, '_blank');
    },
  },
};
// Put here how to design each light in a page
</script>

<style>

.bulb__toggle-icon:hover {
  cursor: pointer;
}

</style>