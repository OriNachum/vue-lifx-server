import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  client: {},
};

const getters = {
  getBulbs: () => [],
  getScenes: () => [],
  getSchedules: () => [],
};

const actions = {
  init: () => {},
};

const mutations = {

};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
