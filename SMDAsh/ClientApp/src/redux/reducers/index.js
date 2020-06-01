import { combineReducers } from 'redux';
import chartAnoReducer from "./Anomaly/chartAnoReducer";
import chartSrReducer from "./SR/chartSrReducer";
import chartEvolution from "./Evolution/chartEvolutionReducer";

import user from './auth/userReducer';
import loading from './loadingReducer';


const rootReducer = combineReducers({ 
    user, 
    loading,
    chartAno:chartAnoReducer,
    chartSr:chartSrReducer,
    chartEvolution:chartEvolution
});

export default rootReducer;
