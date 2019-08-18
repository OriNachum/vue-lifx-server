import baseApi from './baseApi';

const { activeSite, getAxiosParsedUrl } = baseApi;
const controllerPath = 'ActionService/api/Action';

const urls = {
  getSchedule: `${activeSite}/${controllerPath}/GetSchedule`,
  getActions: `${activeSite}/${controllerPath}/GetActions`,
  getSupportedActions: `${activeSite}/${controllerPath}/GetSupportedActions`,
  createAction: `${activeSite}/${controllerPath}/CreateAction`,
  scheduleAction: `${activeSite}/${controllerPath}/ScheduleAction`,
};

const getSchedule = () => {
  return getAxiosParsedUrl({ url: urls.getSchedule })
    .then((data) => {
      return data;
    });
};
const getActions = () => {
  return getAxiosParsedUrl({ url: urls.getActions })
    .then((data) => {
      return data;
    });
};
const getSupportedActions = () => {
  return getAxiosParsedUrl({ url: urls.getSupportedActions })
    .then((data) => {
      return data;
    });
};
const createAction = () => getAxiosParsedUrl({ url: urls.createAction });
const scheduleAction = () => getAxiosParsedUrl({ url: urls.scheduleAction });

export default {
  getSchedule,
  getActions,
  getSupportedActions,
  createAction,
  scheduleAction,
};
