import get from 'lodash/get';
import request from 'request-promise';

// eslint-disable-next-line import/prefer-default-export
export const getTemperature = async () => {
  const response = await request(
    'http://api.openweathermap.org/data/2.5/weather?q=Paris,fr&APPID=b931ed617e0cf08353ced5dbc4aff024&units=metric',
    { json: true }
  );
  const tempFloat = get(response, 'main.temp');
  return typeof tempFloat === 'number' ? parseInt(tempFloat, 10) : null;
};
