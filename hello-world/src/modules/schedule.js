import Vue from 'vue';
import Vuex from 'vuex';
import actionProviderApi from '@/services/actionProviderApi';

Vue.use(Vuex);

export const moduleName = 'schedule';

export const getters = {
  GET_SCHEDULE: 'GET_SCHEDULE',
  GET_ACTIONS: 'GET_ACTIONS',
  GET_SUPPORTEDACTIONS: 'GET_SUPPORTEDACTIONS',
};

export const actions = {
  INIT: 'INIT',
  DEFINE_ACTION: 'DEFINE_ACTION',
  SCHEDULE_ACTION: 'SCHEDULE_ACTION',
  DELETE_SCHEDULED_ACTION: 'DELETE_SCHEDULED_ACTION',
  MODIFY_SCHEDULED_ACTION: 'MODIFY_SCHEDULED_ACTION',
};

// getSchedule,
// getActions
// getSupportedActions,
// createAction,
// scheduleAction,

const moduleState = {
  actions: [],
  supportedActions: [],
  schedule: [],
};

const actionsImpl = {
  [actions.INIT]: ({ commit }) => {
    actionProviderApi.getSchedule()
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        commit('setSchedule', Actions);
      });

    actionProviderApi.getActions()
      .then((definedActions) => {
        commit('setActions', definedActions);
      });

    actionProviderApi.getSupportedActions()
      .then((supportedActions) => {
        commit('setSupportedActions', supportedActions);
      });
  },
  [actions.DEFINE_ACTION]: ({ commit }, { name, supportedAction, parameters }) => {
    actionProviderApi.defineAction({ name, supportedAction, parameters })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        // commit('setSchedule', Actions);
      });
  },
  [actions.SCHEDULE_ACTION]: ({ commit }, { name, timeToRun, dayOfWeek }) => {
    actionProviderApi.scheduleAction({ name, timeToRun, dayOfWeek })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        // commit('setSchedule', Actions);
      });
  },
  [actions.DELETE_SCHEDULED_ACTION]: ({ commit }, { Id }) => {
    actionProviderApi.deleteScheduledAction({ Id })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        // commit('setSchedule', Actions);
      });
  },
  [actions.MODIFY_SCHEDULED_ACTION]: ({ commit }, { action }) => {
    const adaptedAction = { ...action };
    adaptedAction.DaysOfWeek = adaptedAction.DaysOfWeek.split(',');
    actionProviderApi.modifyScheduledAction({ action: adaptedAction })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        // commit('setSchedule', Actions);
      });
  },
};

const gettersImpl = {
  [getters.GET_SCHEDULE]: state => state.schedule,
  [getters.GET_ACTIONS]: state => state.actions,
  [getters.GET_SUPPORTEDACTIONS]: state => state.supportedActions,
};

const mutations = {
  setSchedule(state, schedule) {
    Vue.set(state, 'schedule', schedule);
  },
  setActions(state, definedActions) {
    Vue.set(state, 'actions', definedActions);
  },
  setSupportedActions(state, supportedActions) {
    Vue.set(state, 'supportedActions', supportedActions);
  },
};

export default {
  namespaced: true,
  state: moduleState,
  getters: gettersImpl,
  actions: actionsImpl,
  mutations,
};
