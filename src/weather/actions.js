import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionTypes.js';

import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Rx';

export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchWeather2 = cityCode => ({ type: FETCH_STARTED, cityCode });
export const fetchWeatherSuccess2 = result => {
  return { type: FETCH_SUCCESS, result };
};
export const fetchWeatherFailure2 = (error) => {
  return {
    type: FETCH_FAILURE,
    error
  }
}

export const fetchWeatherEpic = action$ =>
  action$.ofType(FETCH_STARTED)
    .mergeMap(action =>
      ajax.getJSON(`/data/cityinfo/${action.cityCode}.html`)
        .map(response => fetchWeatherSuccess2(response.weatherinfo))
        .catch(error => Observable.of(fetchWeatherFailure2(error)))
    );




export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;

    dispatch(fetchWeatherStarted())

    return fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        dispatch(fetchWeatherSuccess(responseJson.weatherinfo));
      }).catch((error) => {
        dispatch(fetchWeatherFailure(error));
      });
    }).catch((error) => {
      dispatch(fetchWeatherFailure(error));
    })
  };
}


