import Vue from 'vue';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb as fasLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(fasLightbulb);
library.add(farLightbulb);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  Vuex,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
