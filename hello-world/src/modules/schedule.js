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
        const parsedActions = [];
        Actions.forEach((x) => {
          const action = { Parameters: Object.entries(x.Parameters) };
          parsedActions.push(action);
        });

        commit('setSchedule', parsedActions);
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
  [actions.DEFINE_ACTION]: ({ commit }, {
    ActionId, Name, Parameters, Service,
  }) => {
    // const model = {
    //   Name,
    //   Service,
    //   ActionId,
    //   Parameters: { },
    // };
    const model = { Parameters: { } };
    Parameters.forEach((x) => {
      const parameterName = x[0];
      const parameterValue = x[1];
      model.Parameters[parameterName] = parameterValue;
    });
    actionProviderApi.defineAction({
      actionId: ActionId,
      name: Name,
      parameters: JSON.stringify(model.Parameters),
      service: Service,
    })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        commit('setSchedule', Actions);
      });
  },
  [actions.SCHEDULE_ACTION]: ({ commit }, { action }) => {
    const parsedAction = { ...action };
    const parameters = { };
    parsedAction.Parameters.forEach((x) => {
      const parameterName = x[0];
      const parameterValue = x[1];
      parameters[parameterName] = parameterValue;
    });
    parsedAction.Parameters = parameters;
    actionProviderApi.scheduleAction({ action: parsedAction })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        commit('setSchedule', Actions);
      });
  },
  [actions.DELETE_SCHEDULED_ACTION]: ({ commit }, { Id }) => {
    actionProviderApi.deleteScheduledAction({ Id })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        commit('setSchedule', Actions);
      });
  },
  [actions.MODIFY_SCHEDULED_ACTION]: ({ commit }, { action }) => {
    const adaptedAction = { ...action };
    if (adaptedAction.DaysOfWeek && !Array.isArray(adaptedAction.DaysOfWeek)) {
      adaptedAction.DaysOfWeek = adaptedAction.DaysOfWeek.split(',');
    }
    const Parameters = { };
    adaptedAction.Parameters.forEach((x) => {
      const parameterName = x[0];
      const parameterValue = x[1];
      Parameters[parameterName] = parameterValue;
    });
    adaptedAction.Parameters = Parameters;

    actionProviderApi.modifyScheduledAction({ action: adaptedAction })
      .then((scheduleModel) => {
        const { Actions } = scheduleModel;
        commit('setSchedule', Actions);
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
