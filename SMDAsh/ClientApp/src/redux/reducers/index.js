import { combineReducers } from 'redux';
import chartAnoReducer from "./Anomaly/chartAnoReducer";
import chartSrReducer from "./SR/chartSrReducer";
import chartEvolutionReducer from "./Evolution/chartEvolutionReducer";
import pieBacklogByOwnerAnoReducer from "./Anomaly/backlogByOwnerAnoReducer";
import { yearsInReducer, yearsOutReducer } from "./Params/yearReducer";

import user from './auth/userReducer';
import loading from './loadingReducer';


const rootReducer = combineReducers({ 
    user, 
    loading,
    chartAno:chartAnoReducer,
    chartSr:chartSrReducer,
    chartEvolution:chartEvolutionReducer,
    pieBacklogByOwnerAno:pieBacklogByOwnerAnoReducer,
    yearsIn:yearsInReducer,
    yearsOut:yearsOutReducer
});

export default rootReducer;
