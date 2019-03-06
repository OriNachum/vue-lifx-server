import Vue from 'vue';
import Vuex from 'vuex';
import mainPage from '@/modules/mainPage';
import bulbPage from '@/modules/bulbPage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainPage,
    bulbPage,
  },
  strict: false,
});
