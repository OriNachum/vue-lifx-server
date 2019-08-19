import Vue from 'vue';
import Vuex from 'vuex';
import mainPage from '@/modules/mainPage';
import bulbPage from '@/modules/bulbPage';
import schedule from '@/modules/schedule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainPage,
    bulbPage,
    schedule,
  },
  strict: false,
});
