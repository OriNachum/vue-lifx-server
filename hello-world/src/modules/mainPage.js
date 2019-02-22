import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';

const moduleName = 'mainPage';
const GET_BULBS_LOCAL = 'GET_BULBS';
const GET_SCENES_LOCAL = 'GET_SCENES';
const GET_SCHEDULES_LOCAL = 'GET_SCHEDULES';
export const INIT_LOCAL = 'INIT';

export const GET_BULBS = `${moduleName}/${GET_BULBS_LOCAL}`;
export const GET_SCENES = `${GET_SCENES_LOCAL}`;
export const GET_SCHEDULES = `${GET_SCHEDULES_LOCAL}`;
export const INIT = `${moduleName}/${INIT_LOCAL}`;

const moduleState = {
  bulbs: [
    1,
    2,
    3,
  ],
  scenes: [
    1,
  ],
  schedules: [
    1,
  ],
};

const getters = {
  [GET_BULBS_LOCAL]: state => () => [...state.bulbs],

  [GET_SCENES_LOCAL]: state => () => [...state.scenes],

  [GET_SCHEDULES_LOCAL]: state => () => [...state.schedules],
};

const actions = {
  [INIT_LOCAL]: async ({ commit }) => {
    const lights = await lifxClientApi.verifyLights();
    if (lights) {
      commit('resetBulbs');
    }

    lights.forEach((bulb) => {
      commit('addBulb', bulb);
    });
  },
};

const mutations = {
  resetBulbs({ state }) {
    state.bulbs.clear();
  },
  addBulb({ state }, { bulb }) {
    state.bulbs.push(bulb);
  },
};

Vue.use(Vuex);

export default {
  namespaced: true,
  state: moduleState,
  getters,
  actions,
  mutations,
};
