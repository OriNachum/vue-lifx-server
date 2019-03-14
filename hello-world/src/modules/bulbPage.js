import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';
// import { stat } from 'fs';

export const getters = {
  GET_LABEL: 'GET_LABEL',
  GET_POWER: 'GET_POWER',
  IS_BULB_DEFINED: 'IS_BULB_DEFINED',
  GET_LOADING: 'GET_LOADING',
  GET_BRIGHTNESS: 'GET_BRIGHTNESS',
  GET_LAST_ACTION_RESPONSE: 'GET_LAST_ACTION_RESPONSE',
  GET_TEMPERATURE: 'GET_TEMPERATURE',
  GET_HUE: 'GET_HUE',
  GET_SATURATION: 'GET_SATURATION',
};
export const actions = {
  INIT: 'INIT',
  TOGGLE_BULB: 'TOGGLE_BULB',
  FADE_TO_STATE: 'FADE_TO_STATE',
  REFRESH_BULBS: 'REFRESH_BULBS',
};

export const moduleName = 'bulbPage';

const moduleState = {
  debugInfo: '',
  bulb: '',
  loading: false,
  lastActionResponse: { responseType: { }, responseData: { } },
};

const gettersImpl = {
  [getters.GET_LABEL]: state => state.bulb.label,
  [getters.GET_POWER]: state => state.bulb.power,
  [getters.GET_BRIGHTNESS]: state => state.bulb.brightness,
  [getters.GET_TEMPERATURE]: state => state.bulb.temperature,
  [getters.GET_HUE]: state => state.bulb.colorHue,
  [getters.GET_SATURATION]: state => state.bulb.colorSaturation,

  [getters.IS_BULB_DEFINED]: (state) => {
    if (state.bulb) {
      return true;
    }
    return false;
  },
  [getters.GET_LOADING]: state => state.loading,
  [getters.GET_LAST_ACTION_RESPONSE]: state => state.lastActionResponse,
};

const actionsImpl = {
  [actions.INIT]: ({ commit }, bulb) => {
    commit('setBulb', { bulb });
  },
  [actions.REFRESH_BULBS]: ({ commit }) => {
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
  [actions.TOGGLE_BULB]: ({ commit, state }, overtime) => {
    commit('setLoading', { loading: true });
    const { bulb } = state;
    const { label } = bulb;
    if (bulb.power) {
      lifxClientApi.setOffAsync({ label, overtime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    } else {
      lifxClientApi.setOnAsync({ label, overtime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    }
  },
  [actions.FADE_TO_STATE]:
  ({ commit, state }, { newState, overtime }) => { // Adapt this to fade to state
    commit('setLoading', { loading: true });
    const { bulb } = state;
    const { label } = bulb;
    // const bulbState = { ...bulb };
    // bulbState.brightness = newState.brightness;
    // const bulbState = JSON.stringify(newState);
    lifxClientApi.fadeToState({ label, bulbState: newState, overtime })
      .then((response) => {
        const { responseType, responseData, bulb: newBulbState } = response;
        commit('setBulb', { bulb: newBulbState });
        commit('setLastActionResponse', { responseType, responseData });
      }).finally(() => {
        commit('setLoading', { loading: false });
      });
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
  getters: gettersImpl,
  actions: actionsImpl,
  mutations,
};
