import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducer as weatherReducer, actions as weatherActions } from './weather/';

const { fetchWeatherEpic } = weatherActions;

const win = window;

const rootEpic = combineEpics(
  fetchWeatherEpic
);

const reducer = combineReducers({
  weather: weatherReducer
});

const epicMiddleware = createEpicMiddleware(rootEpic);

const storeEnhancers = compose(
  applyMiddleware(epicMiddleware),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);

