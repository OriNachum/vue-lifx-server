import baseApi from './baseApi';

const { activeSite, getAxiosParsedUrl } = baseApi;
const controllerPath = 'ActionService/api/Action';

const urls = {
  getSchedule: `${activeSite}/${controllerPath}/GetSchedule`,
  getActions: `${activeSite}/${controllerPath}/GetActions`,
  getSupportedActions: `${activeSite}/${controllerPath}/GetSupportedActions`,
  defineAction: `${activeSite}/${controllerPath}/DefineAction`,
  scheduleAction: `${activeSite}/${controllerPath}/ScheduleAction`,
};

const getSchedule = () => getAxiosParsedUrl({ url: urls.getSchedule });

const getActions = () => getAxiosParsedUrl({ url: urls.getActions });

const getSupportedActions = () => getAxiosParsedUrl({ url: urls.getSupportedActions });

const defineAction = ({ name, supportedAction, parameters }) => getAxiosParsedUrl({
  url: urls.defineAction,
  params: { name, supportedAction, parameters },
});

const scheduleAction = ({ name, timeToRun, dayOfWeek }) => getAxiosParsedUrl({
  url: urls.scheduleAction,
  params: { name, timeToRun, dayOfWeek },
});

export default {
  getSchedule,
  getActions,
  getSupportedActions,
  defineAction,
  scheduleAction,
};
