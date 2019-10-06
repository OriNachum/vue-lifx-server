import baseApi from './baseApi';

const { activeSite, getAxiosParsedUrl } = baseApi;
const controllerPath = 'ActionService/api/Action';
// const controllerPath = 'api/Action';

const urls = {
  getSchedule: `${activeSite}/${controllerPath}/GetSchedule`,
  getActions: `${activeSite}/${controllerPath}/GetActions`,
  getSupportedActions: `${activeSite}/${controllerPath}/GetSupportedActions`,
  defineAction: `${activeSite}/${controllerPath}/DefineAction`,
  scheduleAction: `${activeSite}/${controllerPath}/ScheduleAction`,
  deleteScheduledAction: `${activeSite}/${controllerPath}/DeleteScheduledAction`,
  modifyScheduledAction: `${activeSite}/${controllerPath}/ModifyScheduledAction`,
};

const getSchedule = () => getAxiosParsedUrl({ url: urls.getSchedule });

const getActions = () => getAxiosParsedUrl({ url: urls.getActions });

const getSupportedActions = () => getAxiosParsedUrl({ url: urls.getSupportedActions });

const defineAction = ({
  actionId, name, parameters, service,
}) => getAxiosParsedUrl({
  url: urls.defineAction,
  params: {
    actionId, name, parameters, service,
  },
});

const scheduleAction = ({ action }) => getAxiosParsedUrl({
  url: urls.scheduleAction,
  params: { actionModel: action },
});

const deleteScheduledAction = ({ Id }) => getAxiosParsedUrl({
  url: urls.deleteScheduledAction,
  params: { Id },
});

const modifyScheduledAction = ({ action }) => getAxiosParsedUrl({
  url: urls.modifyScheduledAction,
  params: { actionModel: action },
});

export default {
  getSchedule,
  getActions,
  getSupportedActions,
  defineAction,
  scheduleAction,
  deleteScheduledAction,
  modifyScheduledAction,
};
