<template>
  <div class="main-page">
    <div v-if="loading()">
      <div>
        Loading...
        </div>
    </div>
    <div v-else>
      <div @click="refreshBulbs()">
        [Refresh bulbs]
      </div>
      <div v-if="showError()">
        Error: {{ getLastActionResponse().responseData }}
      </div>
      <div v-if="!getBulbs().length">
        <div>
          No bulbs found.
        </div>
      </div>
      <div v-else>
        <div class="bulbs">
          <div v-for="bulb in getBulbs()" :key="bulb.label">
            <!--<router-link :to="{ name:'bulbPage', path:`/${bulb.label}`, params: { label: bulb.label } }">-->
            <router-link :to="{ name: 'bulb', params: { bulb } }">
              <bulb :bulb="bulb">
              </bulb>
            <!--</div>-->
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bulb from '@/components/Bulb.vue';
// import BulbPage from '@/views/BulbPage.vue';

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
    Bulb,
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
    routeToBulbPage(bulb) {
      this.$router.push({
        name: 'bulbPage',
        params: { bulb },
      });
      // const routeData =
      //  this.$router.resolve({ name: 'bulbPage', component: BulbPage, params: { bulb } });
      // window.open(routeData.href, '_blank');
    },
  },
  mounted() {
    // await this.init();
  },
};
</script>
