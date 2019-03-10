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
  off: `${activeSite}Lifx/Api/Off`,
  on: `${activeSite}Lifx/Api/On`,
  setBrightness: `${activeSite}Lifx/Api/Brightness`,
  setColor: `${activeSite}Lifx/Api/Color`,
  setLabel: `${activeSite}Lifx/Api/Label`,
  setPower: `${activeSite}Lifx/Api/Power`,
  setTemperature: `${activeSite}Lifx/Api/Temperature`,
};

const adaptDeserializedBulb = (bulb) => {
  const address = `${bulb.IPv4Address}`;
  return {
    label: `${bulb.Label}`,
    address,
    product: `${bulb.Product}`,
    version: `${bulb.Version}`,
    power: `${bulb.Power}` !== '0',
    temperature: `${bulb.Temperature}`,
    brightness: `${bulb.Brightness}`,
    colorHue: `${bulb.ColorHue}`,
    colorSaturation: `${bulb.ColorSaturation}`,
    lastVerifiedState: `${bulb.LastVerifiedState}`,
    stateVerificationTimeUtc: `${bulb.StateVerificationTimeUtc}`,
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

const getBulbsAsync = () => getAxiosParsedUrl({ url: urls.getBulbs });

const toggleBulbAsync = label => getAxiosParsedUrl({
  url: urls.toggleBulb,
  params: { label },
});

const setOffAsync = ({ label, overTime }) => getAxiosParsedUrl({
  url: urls.off,
  params: { label, overTime },
});

const setOnAsync = ({ label, overTime }) => getAxiosParsedUrl({
  url: urls.on,
  params: { label, overTime },
});

const setBrightnessAsync = async () => {
  const status = await axios.get(urls.setBrightness, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return status;
};

const setColorAsync = async () => {
  const result = await axios.get(urls.setColor, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return result;
};

const setLabelAsync = async () => {
  const status = await axios.get(urls.setLabel, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return status;
};

const setPowerAsync = async () => {
  const result = await axios.get(urls.setPower, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return result;
};

const setTemperatureAsync = async () => {
  const result = await axios.get(urls.setTemperature, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return result;
};

export default {
  resetAsync,
  getBulbsAsync,
  toggleBulbAsync,
  refreshBulbsAsync,
  setOffAsync,
  setOnAsync,
  setBrightnessAsync,
  setColorAsync,
  setLabelAsync,
  setPowerAsync,
  setTemperatureAsync,
};
