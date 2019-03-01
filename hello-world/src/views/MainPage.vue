<template>
  <div class="main-page">
    <div class="bulbs">
      <div v-if="loading()">
        <div>
          Loading...
          </div>
      </div>
      <div v-else>
        <div v-if="showError()">
          Error: {{ getLastActionResponse().responseData }}
        </div>
        <div v-if="!getBulbs().length">
          <div @click="refreshBulbs()">
            No bulbs found.
          </div>
        </div>
        <div v-else>
          <div v-for="bulb in getBulbs()" :key="bulb.Label">
            <!-- Add this when adding routing to bulb page<div @click="toggleBulb(bulb)">-->
            <div>
              <light-bulb :bulb="bulb">
              </light-bulb>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LightBulb from '@/components/LightBulb.vue';
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
  name: 'mainPage',
  data() {
    return {

    };
  },
  components: {
    LightBulb,
  },
  computed: {
    ...mapGetters(moduleName, {
      getBulbs: GET_BULBS,
      loading: GET_LOADING,
      getLastActionResponse: GET_LAST_ACTION_RESPONSE,
    }),
  },
  methods: {
    ...mapActions(moduleName, {
      refreshBulbs: REFRESH_BULBS,
      toggleBulb: TOGGLE_BULB,
      // init: INIT,
    }),
    showError: () => this && this.computed
      && this.computed.getLastActionResponse().responseType !== 0
      && (this.computed.getLastActionResponse().responseData),
  },
  mounted() {
    // await this.init();
  },
};
</script>
