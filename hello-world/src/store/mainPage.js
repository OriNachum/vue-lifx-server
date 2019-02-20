import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleState = {
  client: {
    bulbs: [
      1,
      2,
      3,
    ],
  },
};

const moduleGetters = {
  getBulbs: ({ state }) => {
    const [...returnValue] = [
      1,
      2,
      3,
    ]; // state.client.bulbs;
    return () => () => returnValue;
  },

  getScenes() {
    return () => { };
  },

  getSchedules() {
    return () => { };
  },
};

const moduleActions = {
  init() {
  },
};

const mutations = {

};

export default new Vuex.Store({
  state: moduleState,
  getters: moduleGetters,
  actions: moduleActions,
  mutations,
});
