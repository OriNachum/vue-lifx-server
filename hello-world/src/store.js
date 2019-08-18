import Vue from 'vue';
import Vuex from 'vuex';
import mainPage from '@/modules/mainPage';
import bulbPage from '@/modules/bulbPage';
import schedulePage from '@/modules/schedulePage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainPage,
    bulbPage,
    schedulePage,
  },
  strict: false,
});
