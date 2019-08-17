import axios from 'axios';
// import https from 'https';
// const httpsAgent = new https.Agent({ keepAlive: true }),

// axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: true });
/*
  axios.defaults.withCredentials = false;
  axios.defaults.rejectUnauthorized = false;
  axios.rejectUnauthorized = false;
*/
// axios.httpsAgent.rejectUnauthorized = false;
// axios.defaults.httpsAgent.rejectUnauthorized = false;

// const httsAgent = axios. new https.Agent({ rejectUnauthorized: false });

/*
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  cert: fs.readFileSync("./usercert.pem"),
  key: fs.readFileSync("./key.pem"),
  passphrase: "YYY"
})
*/

const hostname = 'ori';

const sites = {
  dev: `https://${hostname}:44370/`,
  devIisDebug: `https://${hostname}:5001/`,
  devIis: `https://${hostname}/LifxWebApi/`,
};

const { devIis: activeSite } = sites;

const urls = {
  getBulbs: `${activeSite}Lifx/Api/GetBulbs`,
  reset: `${activeSite}Lifx/Api/Reset`,
  toggleBulb: `${activeSite}Lifx/Api/Toggle`,
  refreshBulbs: `${activeSite}Lifx/Api/Refresh`,
  refreshBulb: `${activeSite}Lifx/Api/RefreshBulb`,
  off: `${activeSite}Lifx/Api/Off`,
  on: `${activeSite}Lifx/Api/On`,
  setBrightness: `${activeSite}Lifx/Api/SetBrightness`,
  setColor: `${activeSite}Lifx/Api/SetColor`,
  setLabel: `${activeSite}Lifx/Api/Label`,
  setPower: `${activeSite}Lifx/Api/SetPower`,
  setTemperature: `${activeSite}Lifx/Api/SetTemperature`,
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
