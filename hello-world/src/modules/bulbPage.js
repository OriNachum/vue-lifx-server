import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';
// import { stat } from 'fs';

export const moduleName = 'bulbPage';
export const GET_LABEL = 'GET_LABEL';
export const GET_POWER = 'GET_POWER';
export const IS_BULB_DEFINED = 'IS_BULB_DEFINED';
export const GET_SCENES = 'GET_SCENES';
export const GET_SCHEDULES = 'GET_SCHEDULES';
export const GET_LOADING = 'GET_LOADING';
export const INIT = 'INIT';
export const TOGGLE_BULB = 'TOGGLE_BULB';
export const REFRESH_BULBS = 'REFRESH_BULBS';
export const GET_LAST_ACTION_RESPONSE = 'GET_LAST_ACTION_RESPONSE';

const moduleState = {
  debugInfo: '',
  bulb: '',
  loading: false,
  lastActionResponse: { responseType: { }, responseData: { } },
};

const getters = {
  [GET_LABEL]: state => state.bulb.label,
  [GET_POWER]: state => state.bulb.power,
  [IS_BULB_DEFINED]: (state) => {
    if (state.bulb) {
      return true;
    }
    return false;
  },
  [GET_LOADING]: state => state.loading,
  [GET_LAST_ACTION_RESPONSE]: state => state.lastActionResponse,
};

const actions = {
  [INIT]: ({ commit }, bulb) => {
    commit('setBulb', { bulb });
  },
  [REFRESH_BULBS]: ({ commit }) => {
    commit('setLoading', { loading: true });
    lifxClientApi.getBulbsAsync()
      .then((response) => {
        const { responseType, responseData, bulbs } = response;

        commit('resetBulbs', { bulbs });
        commit('setLastActionResponse', { responseType, responseData });
      }).finally(() => {
        commit('setLoading', { loading: false });
      });
  },
  [TOGGLE_BULB]: ({ commit, state }, overTime) => {
    commit('setLoading', { loading: true });
    const { bulb } = state;
    const { label } = bulb;
    if (bulb.power) {
      lifxClientApi.setOffAsync({ label, overTime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    } else {
      lifxClientApi.setOnAsync({ label, overTime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    }
  },
};

const mutations = {
  setBulb(state, { bulb }) {
    Vue.set(state, 'bulb', bulb);
  },
  resetBulbs(state, { bulbs }) {
    Vue.set(state, 'bulbs', bulbs);
  },
  setLoading(state, { loading }) {
    Vue.set(state, 'loading', loading);
  },
  setLastActionResponse(state, { responseType, responseData }) {
    Vue.set(state, 'lastActionResponse', { responseType, responseData });
  },
  setPower(state, { power }) {
    Vue.set(state.bulb, 'power', power);
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
