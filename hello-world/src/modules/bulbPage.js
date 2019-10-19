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
  GET_COLOR: 'GET_COLOR',
};
export const actions = {
  INIT: 'INIT',
  REFRESH_BULB: 'REFRESH_BULB',
  TOGGLE_BULB: 'TOGGLE_BULB',
  FADE_TO_STATE: 'FADE_TO_STATE',
  REFRESH_BULBS: 'REFRESH_BULBS',
  SET_HUE: 'SET_HUE',
  SET_BRIGHTNESS: 'SET_BRIGHTNESS',
  SET_SATURATION: 'SET_SATURATION',
  SET_TEMPERATURE: 'SET_TEMPERATURE',
};

export const moduleName = 'bulbPage';

const moduleState = {
  debugInfo: '',
  bulb: '',
  color: {
    hue: 50,
    saturation: 50,
    luminosity: 50,
    alhpa: 1,
  },
  loading: false,
  lastActionResponse: { responseType: { }, responseData: { } },
};

const gettersImpl = {
  [getters.GET_LOADING]: state => state.loading,
  [getters.GET_LABEL]: state => state.bulb.label,
  [getters.GET_POWER]: state => state.bulb.power,
  [getters.GET_BRIGHTNESS]: state => state.bulb.brightness * 100,
  [getters.GET_TEMPERATURE]: state => state.bulb.temperature,
  [getters.GET_HUE]: state => state.bulb.hue,
  [getters.GET_SATURATION]: state => state.bulb.saturation * 100,
  [getters.GET_COLOR]: state => state.color,

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

  [actions.SET_BRIGHTNESS]: ({ commit, state }, { brightness, overtime }) => {
    const { color } = state;
    const { brightness: currentBrightness } = color;
    if (`${brightness}` !== `${currentBrightness}`) {
      commit('setBrightness', brightness);
      commit('setLoading', { loading: true });
      const { bulb } = state;
      const { label } = bulb;

      lifxClientApi.setBrightnessAsync({ label, brightness, overtime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    }
  },
  [actions.SET_TEMPERATURE]: ({ commit, state }, { temperature, overtime }) => {
    const { color } = state;
    const { temperature: currentTemperature } = color;
    if (`${temperature}` !== `${currentTemperature}`) {
      commit('setTemperature', temperature);
      commit('setLoading', { loading: true });
      const { bulb } = state;
      const { label } = bulb;
      lifxClientApi.setTemperatureAsync({ label, temperature, overtime })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    }
  },

  [actions.SET_COLOR]: ({ commit, state }, { hue, overtime }) => {
    const { color } = state;
    const { hue: currentHue } = color;
    if (`${hue}` !== `${currentHue}`) {
      commit('setHue', hue);

      commit('setLoading', { loading: true });
      const { bulb, saturation } = state;
      const { label } = bulb;
      lifxClientApi.setColorAsync({
        label,
        saturation,
        hue,
        overtime,
      })
        .then((response) => {
          const { responseType, responseData, bulb: newBulbState } = response;
          commit('setBulb', { bulb: newBulbState });
          commit('setLastActionResponse', { responseType, responseData });
        }).finally(() => {
          commit('setLoading', { loading: false });
        });
    }
  },

  [actions.SET_HUE]: ({ commit, state }, hue) => {
    const { color } = state;
    const { hue: currentHue } = color;
    if (`${hue}` !== `${currentHue}`) {
      commit('setHue', hue);
    }
  },
  [actions.SET_SATURATION]: ({ commit, state }, saturation) => {
    const { color } = state;
    const { saturation: currentSaturation } = color;
    if (`${saturation}` !== `${currentSaturation}`) {
      commit('setSaturation', saturation);
    }
  },


  [actions.REFRESH_BULB]: ({ commit, state }) => {
    commit('setLoading', { loading: true });
    lifxClientApi.refreshBulbAsync(state.bulb.label)
      .then((response) => {
        const { bulb } = response;
        commit('setBulb', { bulb });
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
  setHue(state, hue) {
    Vue.set(state.color, 'hue', hue);
  },
  setBrightness(state, brightness) {
    Vue.set(state.color, 'brightness', brightness);
  },
  setSaturation(state, saturation) {
    Vue.set(state.color, 'saturation', saturation);
  },
  setTemperature(state, temperature) {
    Vue.set(state.color, 'temperature', temperature);
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
