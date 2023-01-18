import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import datasetReducer from './datasetReducer';
import rasterReducer from './rasterReducer';
import dangerReducer from './dangerReducer';
import displayReducer from './displayReducer';

const rootReducer = combineReducers({
  alerts: alertReducer,
  dataset: datasetReducer,
  raster: rasterReducer,
  danger: dangerReducer,
  display: displayReducer,
});

export default rootReducer;
