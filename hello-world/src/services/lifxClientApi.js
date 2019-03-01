import axios from 'axios';

axios.defaults.withCredentials = false;
const sites = {
  dev: 'https://localhost:44370/',
  deviis: 'http://localhost/LifxLanWebApi/',
};

const urls = {
  getBulbs: `${sites.dev}Lifx/Api/GetBulbs`,
  reset: `${sites.dev}Lifx/Api/Reset`,
  toggleBulb: `${sites.dev}Lifx/Api/Toggle`,
  refreshBulbs: `${sites.dev}Lifx/Api/Refresh`,
  off: `${sites.dev}Lifx/Api/Off`,
  on: `${sites.dev}Lifx/Api/On`,
  setBrightness: `${sites.dev}Lifx/Api/Brightness`,
  setColor: `${sites.dev}Lifx/Api/Color`,
  setLabel: `${sites.dev}Lifx/Api/Label`,
  setPower: `${sites.dev}Lifx/Api/Power`,
  setTemperature: `${sites.dev}Lifx/Api/Temperature`,
};

const getAxiosParsedUrl = ({ url, params }) => {
  const result = axios.get(url, {
    timeout: 60000,
    params,
  }).then((response) => {
    const { data } = response;
    return data;
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

const setOffAsync = async () => {
  const status = await axios.get(urls.off, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return status;
};

const setOnAsync = async () => {
  const result = await axios.get(urls.on, {
    timeout: 60000,
  })
    .then((response) => {
      const { data } = response;
      return data;
    });
  return result;
};

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
