import { combineReducers } from 'redux';

import chartAnoReducer from "./Anomaly/chartAnoReducer";
import chartSrReducer from "./SR/chartSrReducer";
import chartEvolutionReducer from "./Evolution/chartEvolutionReducer";

import pieBacklogByOwnerAnoReducer from "./Anomaly/backlogByOwnerAnoReducer";
import pieBacklogByOwnerSrReducer from "./SR/backlogByOwnerSrReducer";
import pieBacklogByOwnerEvolutionReducer from "./Evolution/backlogByOwnerEvolutionReducer";

import { ticketAssignedOcpSrReducer, ticketAssignedRunServiceSrReducer } from './SR/ticketAssignedSrReducer';
import { ticketAssignedOcpEvolutionReducer, ticketAssignedRunServiceEvolutionReducer } from './Evolution/ticketAssignedEvolutionReducer';

import { slaByProjectYearOutAnoReducer } from './Anomaly/slaByProjectAnoReducer';
import { slaByProjectYearOutSrReducer } from './SR/slaByProjectSrReducer';
import { slaByProjectYearOutEvolutionReducer } from './Evolution/slaByProjectEvolutionReducer';

// Params
import { yearsInReducer, yearsOutReducer } from "./Params/yearReducer";
import { categoriesReducer } from './Params/categoryReducer';
import { servicesReducer } from './Params/serviceReducer';
import { ticketAssignedOcpAnoReducer, ticketAssignedRunServiceAnoReducer } from './Anomaly/ticketAssignedAnoReducer';
import { ApplicationBarReducer, ApplicationProjectCourtTrueReducer, ApplicationProjectCourtFalseReducer } from './Params/applicationReducer';
import { weeksReducer, weeksInReducer, weeksOutReducer } from './Params/weekReducer';

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

        /* Anomaly */
    ticketAssignedOcpAno:ticketAssignedOcpAnoReducer,
    ticketAssignedRunServiceAno:ticketAssignedRunServiceAnoReducer,
        /* Service Request */
    ticketAssignedOcpSr:ticketAssignedOcpSrReducer,
    ticketAssignedRunServiceSr:ticketAssignedRunServiceSrReducer,
        /* Evolution */
    ticketAssignedOcpEvolution:ticketAssignedOcpEvolutionReducer,
    ticketAssignedRunServiceEvolution:ticketAssignedRunServiceEvolutionReducer,
    

        /* Anomaly */
    slaByProjectYearOutAno:slaByProjectYearOutAnoReducer,
        /* Service Request */
    slaByProjectYearOutSr:slaByProjectYearOutSrReducer,
        /* Evolution */
    slaByProjectYearOutEvolution:slaByProjectYearOutEvolutionReducer,


    // Params
    yearsIn:yearsInReducer,
    yearsOut:yearsOutReducer,
    categories:categoriesReducer,
    services:servicesReducer,
        /* Weeks */
    weeks:weeksReducer,
    weeksIn:weeksInReducer,
    weeksOut:weeksOutReducer,   
        /* Applications */  
    applications:ApplicationBarReducer,
    applicationsProjectCourtTrue:ApplicationProjectCourtTrueReducer,
    applicationsProjectCourtFalse:ApplicationProjectCourtFalseReducer,  

});

export default rootReducer;
