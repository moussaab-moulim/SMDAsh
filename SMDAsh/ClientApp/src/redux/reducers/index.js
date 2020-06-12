import { combineReducers } from 'redux';

import chartAnoReducer from "./Anomaly/chartAnoReducer";
import chartSrReducer from "./SR/chartSrReducer";
import chartEvolutionReducer from "./Evolution/chartEvolutionReducer";

import pieBacklogByOwnerAnoReducer from "./Anomaly/backlogByOwnerAnoReducer";
import pieBacklogByOwnerSrReducer from "./SR/backlogByOwnerSrReducer";
import pieBacklogByOwnerEvolutionReducer from "./Evolution/backlogByOwnerEvolutionReducer";

import { yearsInReducer, yearsOutReducer } from "./Params/yearReducer";
import { categoriesReducer } from './Params/categoryReducer';
import { servicesReducer } from './Params/serviceReducer';

import user from './auth/userReducer';
import loading from './loadingReducer';



const rootReducer = combineReducers({ 
    user, 
    loading,

    chartAno:chartAnoReducer,
    chartSr:chartSrReducer,
    chartEvolution:chartEvolutionReducer,

    pieBacklogByOwnerAno:pieBacklogByOwnerAnoReducer,
    pieBacklogByOwnerSr:pieBacklogByOwnerSrReducer,
    pieBacklogByOwnerEvolution:pieBacklogByOwnerEvolutionReducer,
    // Params
    yearsIn:yearsInReducer,
    yearsOut:yearsOutReducer,
    categories:categoriesReducer,
    services:servicesReducer
});

export default rootReducer;
