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
  dev: `https://${hostname}:44370`,
  devIisDebug: `https://${hostname}:5001`,
  devIis: `https://${hostname}`,
};

const { devIis: activeSite } = sites;

const getAxiosParsedUrl = ({ url, params }) => {
  const result = axios.get(url, {
    timeout: 60000,
    params,
    // httpsAgent,
  }).then((response) => {
    const { data } = response;
    return data;
  }).catch((reason) => {
    const errorResponse = { responseType: 1, responseData: reason };
    return errorResponse;
  });
  return result;
};

export default {
  activeSite,
  getAxiosParsedUrl,
};


/*
import axios from 'axios';
import baseApi from './baseApi';

const { activeSite } = baseApi;
const controllerPath = 'Lifx/Api';
const urls = {
  getBulbs: `${activeSite}/${controllerPath}/GetBulbs`,
};

const getAxiosParsedUrl = ({ url, params }) => {
  const result = axios.get(url, {
    timeout: 60000,
    params,
    // httpsAgent,
  }).then((response) => {
    const { data } = response;
    return data;
  }).catch((reason) => {
    const errorResponse = { responseType: 1, responseData: reason };
    return errorResponse;
  });
  return result;
};

const getBulbsAsync = () => getAxiosParsedUrl({ url: urls.getBulbs });

export default {
  getBulbsAsync,
};
*/
