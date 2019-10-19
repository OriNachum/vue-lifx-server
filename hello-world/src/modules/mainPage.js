import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';

export const moduleName = 'mainPage';
export const GET_BULBS = 'GET_BULBS';
export const GET_SCENES = 'GET_SCENES';
export const GET_SCHEDULES = 'GET_SCHEDULES';
export const GET_LOADING = 'GET_LOADING';
export const INIT = 'INIT';
export const TOGGLE_BULB = 'TOGGLE_BULB';
export const REFRESH_BULBS = 'REFRESH_BULBS';
export const GET_LAST_ACTION_RESPONSE = 'GET_LAST_ACTION_RESPONSE';

const moduleState = {
  debugInfo: '',
  bulbs: [
  ],
  scenes: [
  ],
  schedules: [
  ],
  loading: false,
  lastActionResponse: { responseType: { }, responseData: { } },
};

const getters = {
  [GET_BULBS]: state => state.bulbs,
  [GET_SCENES]: state => () => [...state.scenes],
  [GET_SCHEDULES]: state => () => [...state.schedules],
  [GET_LOADING]: state => () => state.loading,
  [GET_LAST_ACTION_RESPONSE]: state => () => state.lastActionResponse,
};

const actions = {
  [REFRESH_BULBS]: async ({ commit }) => {
    commit('setLoading', { loading: true });
    await lifxClientApi.getBulbsAsync()
      .then((response) => {
        const { responseType, responseData, bulbs } = response;
        if (responseType === 0) {
          // bulbs.push(bulb);
          commit('resetBulbs', { bulbs });
          commit('setLastActionResponse', { responseType, responseData });
        } else {
          const { message } = responseData;
          commit('resetBulbs', { bulbs });
          commit('setLastActionResponse', { responseType, message });
        }
      }).finally(() => {
        commit('setLoading', { loading: false });
      });
  },
  [TOGGLE_BULB]: ({ commit }, bulb) => {
    commit('setLoading', { loading: true });
    const { label } = bulb;
    lifxClientApi.toggleBulbAsync(label)
      .then((response) => {
        const { responseType, responseData } = response;
        commit('setLastActionResponse', { responseType, responseData });
      }).finally(() => {
        commit('setLoading', { loading: false });
      });
  },
};

const mutations = {
  resetBulbs(state, { bulbs }) {
    Vue.set(state, 'bulbs', bulbs);
  },
  setLoading(state, { loading }) {
    Vue.set(state, 'loading', loading);
  },
  setLastActionResponse(state, { responseType, responseData }) {
    Vue.set(state, 'lastActionResponse', { responseType, responseData });
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
