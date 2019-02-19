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
    const [...returnValue] = state.client.bulbs;
    return returnValue;
  },
  getScenes: () => [],
  getSchedules: () => [],
};

const moduleActions = {
  init: () => {},
};

const mutations = {

};

export default new Vuex.Store({
  moduleState,
  moduleGetters,
  moduleActions,
  mutations,
});
