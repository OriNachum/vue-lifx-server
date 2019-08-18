import axios from 'axios';
import baseApi from './baseApi';

const { activeSite } = baseApi;
const controllerPath = 'LifxWebApi/Lifx/Api';

const urls = {
  getBulbs: `${activeSite}/${controllerPath}/GetBulbs`,
  reset: `${activeSite}/${controllerPath}/Reset`,
  toggleBulb: `${activeSite}/${controllerPath}/Toggle`,
  refreshBulbs: `${activeSite}/${controllerPath}/Refresh`,
  refreshBulb: `${activeSite}/${controllerPath}/RefreshBulb`,
  off: `${activeSite}/${controllerPath}/Off`,
  on: `${activeSite}/${controllerPath}/On`,
  setBrightness: `${activeSite}/${controllerPath}/SetBrightness`,
  setColor: `${activeSite}/${controllerPath}/SetColor`,
  setLabel: `${activeSite}/${controllerPath}/Label`,
  setPower: `${activeSite}/${controllerPath}/SetPower`,
  setTemperature: `${activeSite}/${controllerPath}/SetTemperature`,
};

const adaptDeserializedBulb = (bulb) => {
  const address = `${bulb.IPv4Address}`;
  return {
    label: `${bulb.Label}`,
    address,
    product: `${bulb.Product}`,
    version: `${bulb.Version}`,
    power: `${bulb.State.Power}` !== '0',
    temperature: `${bulb.State.Temperature}`,
    brightness: `${bulb.State.Brightness}`,
    hue: `${bulb.State.Hue}`,
    saturation: `${bulb.State.Saturation}`,
    // lastVerifiedState: `${bulb.State}`,
    stateVerificationTimeUtc: `${bulb.State.StateVerificationTimeUtc}`,
  };
};

const deserializeBulbs = (serializedBulbs) => {
  const bulbs = [];
  let responseBulbs;
  try {
    responseBulbs = JSON.parse(serializedBulbs);
  } catch {
    return bulbs;
  }

  responseBulbs.forEach((deserializedBulb) => {
    const bulb = adaptDeserializedBulb(deserializedBulb);
    bulbs.push(bulb);
  });

  return bulbs;
};

const deserializeBulb = (serializedBulbs) => {
  let deserializedBulb;
  try {
    deserializedBulb = JSON.parse(serializedBulbs);
  } catch {
    return undefined;
  }
  const bulb = adaptDeserializedBulb(deserializedBulb);
  return bulb;
};

const getAxiosParsedUrl = ({ url, params }) => {
  const result = axios.get(url, {
    timeout: 60000,
    params,
    // httpsAgent,
  }).then((response) => {
    const { data } = response;
    const { bulbs, bulb } = data;
    const parsedBulbs = deserializeBulbs(bulbs);
    const parsedBulb = deserializeBulb(bulb);
    const parsedResponse = { ...data, bulbs: parsedBulbs, bulb: parsedBulb };

    return parsedResponse;
  }).catch((reason) => {
    const errorResponse = { responseType: 1, responseData: reason };
    return errorResponse;
  });
  return result;
};

const resetAsync = async () => {
  const status = await axios.get(urls.reset, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return status;
};

const refreshBulbsAsync = async () => {
  const result = await axios.get(urls.refreshBulbs, {
    timeout: 60000,
  }).then((response) => {
    const { data } = response;
    return data;
  }).catch((reason) => {
    const errorResponse = { response: 1, message: reason };
    return errorResponse;
  });
  return result;
};


const refreshBulbAsync = label => getAxiosParsedUrl({
  url: urls.refreshBulb,
  params: { label },
});

const getBulbsAsync = () => getAxiosParsedUrl({ url: urls.getBulbs });

const toggleBulbAsync = label => getAxiosParsedUrl({
  url: urls.toggleBulb,
  params: { label },
});

const setOffAsync = ({ label, overtime }) => getAxiosParsedUrl({
  url: urls.off,
  params: { label, overtime },
});

const setOnAsync = ({ label, overtime }) => getAxiosParsedUrl({
  url: urls.on,
  params: { label, overtime },
});

const setColorAsync = ({
  label,
  saturation,
  hue,
  overtime,
}) => getAxiosParsedUrl({
  url: urls.setColor,
  params: {
    label,
    saturation,
    hue,
    overtime,
  },
});

const setTemperatureAsync = ({ label, temperature, overtime }) => getAxiosParsedUrl({
  url: urls.setTemperature,
  params: { label, temperature, overtime },
});

const setBrightnessAsync = ({ label, brightness, overtime }) => getAxiosParsedUrl({
  url: urls.setBrightness,
  params: { label, brightness, overtime },
});

export default {
  resetAsync,
  getBulbsAsync,
  toggleBulbAsync,
  refreshBulbsAsync,
  refreshBulbAsync,
  setOffAsync,
  setOnAsync,
  setColorAsync,
  setTemperatureAsync,
  setBrightnessAsync,
};
