import { combineReducers } from 'redux';
import chartAnoReducer from "./Anomaly/chartAnoReducer";
import chartSrReducer from "./SR/chartSrReducer";

import user from './auth/userReducer';
import loading from './loadingReducer';


const rootReducer = combineReducers({ 
    user, 
    loading,
    chartAno:chartAnoReducer,
    chartSr:chartSrReducer
});

export default rootReducer;
