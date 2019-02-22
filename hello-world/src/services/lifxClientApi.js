import nodeLifxLan from 'node-lifx-lan';

const verifyLights = async () => {
  const lights = await nodeLifxLan.discover();
  return lights;
};

export default {
  verifyLights,
};
