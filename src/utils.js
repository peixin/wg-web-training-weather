export const getProperty = (object, propertyName, _default = '-') => {
  if (!object) {
    return _default;
  }
  if (object[propertyName] == undefined || object[propertyName] == null) {
    return _default;
  }
  return object[propertyName];
};


export const getWeatherAPIUrl = (endpoint, location, key) => `https://console.roomis.com.cn/s6/${endpoint}?location=${location}&key=${key}`;
