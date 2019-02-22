import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';

const moduleName = 'mainPage';
const GET_BULBS_LOCAL = 'GET_BULBS';
const GET_SCENES_LOCAL = 'GET_SCENES';
const GET_SCHEDULES_LOCAL = 'GET_SCHEDULES';
const GET_DEBUG_INFO_LOCAL = 'GET_DEBUG_INFO';
export const INIT_LOCAL = 'INIT';

export const GET_DEBUG_INFO = `${moduleName}/${GET_DEBUG_INFO_LOCAL}`;
export const GET_BULBS = `${moduleName}/${GET_BULBS_LOCAL}`;
export const GET_SCENES = `${GET_SCENES_LOCAL}`;
export const GET_SCHEDULES = `${GET_SCHEDULES_LOCAL}`;
export const INIT = `${moduleName}/${INIT_LOCAL}`;

const moduleState = {
  debugInfo: '',
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
  [GET_DEBUG_INFO_LOCAL]: state => () => state.debugInfo,
  [GET_BULBS_LOCAL]: state => () => [...state.bulbs],

  [GET_SCENES_LOCAL]: state => () => [...state.scenes],

  [GET_SCHEDULES_LOCAL]: state => () => [...state.schedules],
};

const actions = {
  [INIT_LOCAL]: ({ commit }) => {
    const debugInfo = lifxClientApi.getDebugInfo();
    commit('setDebugInfo', debugInfo);
    const lightsPromise = lifxClientApi.verifyLights();
    if (lightsPromise) {
      lightsPromise.then(({ lights }) => {
        if (lights) {
          commit('resetBulbs');
          lights.forEach((bulb) => {
            commit('addBulb', bulb);
          });
        }
      });
    }
  },
};

const mutations = {
  resetBulbs(state) {
    state.bulbs.clear();
  },
  addBulb(state, { bulb }) {
    state.bulbs.push(bulb);
  },
  setDebugInfo(state, debugInfo) {
    state.debugInfo = debugInfo;
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
