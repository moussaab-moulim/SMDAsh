import { combineReducers } from "redux";
import chartAnoReducer from "./chartAnoReducer";
import rpaAnoReducer from "./rpaAnoReducer";
import userReducer from './Auth/userReducer';

const rootReducer = combineReducers({
  chartAno: chartAnoReducer,
  rpaAno: rpaAnoReducer,
  user: userReducer,
   
})

export default rootReducer;