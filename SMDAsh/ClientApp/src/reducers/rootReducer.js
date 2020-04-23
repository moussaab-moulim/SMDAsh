import { combineReducers } from "redux";
import chartAnoReducer from "./chartAnoReducer";

const rootReducer = combineReducers({
  chartAno: chartAnoReducer
})

export default rootReducer;