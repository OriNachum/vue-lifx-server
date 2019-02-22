import Vue from 'vue';
import Vuex from 'vuex';
import mainPage from '@/modules/mainPage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainPage,
  },
  strict: false,
});
