// import nodeLifxLan from 'node-lifx-lan';

const Lifx = require('node-lifx-lan');
const osLib = require('os');

const getDebugInfo = () => osLib.type()
  .concat('; ')
  .concat(osLib.hostname());
const verifyLights = () => {
  const networkInterfaces = osLib.networkInterfaces();
  if (!networkInterfaces || !Object.keys(networkInterfaces).length) {
    return null;
  }
  const lights = Lifx.discover()
    .then(device_list => [...device_list]);
  return lights;
};

export default {
  verifyLights,
  getDebugInfo,
};
