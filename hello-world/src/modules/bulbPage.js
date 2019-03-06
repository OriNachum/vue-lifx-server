import Vue from 'vue';
import Vuex from 'vuex';
import lifxClientApi from '@/services/lifxClientApi';

export const moduleName = 'bulbPage';
export const GET_LABEL = 'GET_LABEL';
export const SET_LABEL = 'SET_LABEL';
export const GET_SCENES = 'GET_SCENES';
export const GET_SCHEDULES = 'GET_SCHEDULES';
export const GET_LOADING = 'GET_LOADING';
export const INIT = 'INIT';
export const TOGGLE_BULB = 'TOGGLE_BULB';
export const REFRESH_BULBS = 'REFRESH_BULBS';
export const GET_LAST_ACTION_RESPONSE = 'GET_LAST_ACTION_RESPONSE';

const moduleState = {
  debugInfo: '',
  label: '',
  scenes: [
  ],
  schedules: [
  ],
  loading: false,
  lastActionResponse: { responseType: { }, responseData: { } },
};

const getters = {
  [GET_LABEL]: state => () => [...state.label],
  [GET_SCENES]: state => () => [...state.scenes],
  [GET_SCHEDULES]: state => () => [...state.schedules],
  [GET_LOADING]: state => () => state.loading,
  [GET_LAST_ACTION_RESPONSE]: state => () => state.lastActionResponse,
};

const actions = {
  [INIT]: ({ commit }, label) => {
    commit('setLabel', { label });
  },
  [REFRESH_BULBS]: ({ commit }) => {
    commit('setLoading', { loading: true });
    lifxClientApi.getBulbsAsync()
      .then((response) => {
        const { responseType, responseData } = response;
        const bulbs = [];
        if (responseType === 0) {
          const responseBulbs = JSON.parse(responseData);
          responseBulbs.forEach((x) => {
            const address = `${x.IPv4Address}`;
            const bulb = {
              label: `${x.Label}`,
              address,
              product: `${x.Product}`,
              version: `${x.Version}`,
              power: `${x.Power}`,
              temperature: `${x.Temperature}`,
              brightness: `${x.Brightness}`,
              colorHue: `${x.ColorHue}`,
              colorSaturation: `${x.ColorSaturation}`,
              lastVerifiedState: `${x.LastVerifiedState}`,
              stateVerificationTimeUtc: `${x.StateVerificationTimeUtc}`,
            };

            bulbs.push(bulb);
          });
        }

        commit('resetBulbs', { bulbs });
        commit('setLastActionResponse', { responseType, responseData });
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
  setLabel(state, { label }) {
    Vue.set(state, 'label', label);
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
};

Vue.use(Vuex);

export default {
  namespaced: true,
  state: moduleState,
  getters,
  actions,
  mutations,
};
