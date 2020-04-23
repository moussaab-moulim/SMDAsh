import { combineReducers } from "redux";
import chartAnoReducer from "./chartAnoReducer";
import rpaAnoReducer from "./rpaAnoReducer";

const rootReducer = combineReducers({
  chartAno: chartAnoReducer,
  rpaAno: rpaAnoReducer
})

export default rootReducer;