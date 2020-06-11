export const API = 'Authenticate';

// User
export const SET_USER_INFO = 'SET_USER_INFO';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const RESET_USER_INFO = 'RESET_USER_INFO';

// Anomaly 
export const SUCCESS_CHARTANO = 'SUCCESS_CHARTANO';
export const AWAITING_CHARTANO = 'AWAITING_CHARTANO';
export const REJECTED_CHARTANO = 'REJECTED_CHARTANO';
    /* Backlog By Owner */
export const SUCCESS_CHART_BACKLOG_BY_OWNER_ANO = 'SUCCESS_CHART_BACKLOG_BY_OWNER_ANO';
export const AWAITING_CHART_BACKLOG_BY_OWNER_ANO = 'AWAITING_CHART_BACKLOG_BY_OWNER_ANO';
export const REJECTED_CHART_BACKLOG_BY_OWNER_ANO = 'REJECTED_CHART_BACKLOG_BY_OWNER_ANO';


// SR
export const SUCCESS_CHARTSR = 'SUCCESS_CHARTSR';
export const AWAITING_CHARTSR = 'AWAITING_CHARTSR';
export const REJECTED_CHARTSR = 'REJECTED_CHARTSR';
    /* Backlog By Owner */
export const SUCCESS_CHART_BACKLOG_BY_OWNER_SR = 'SUCCESS_CHART_BACKLOG_BY_OWNER_SR';
export const AWAITING_CHART_BACKLOG_BY_OWNER_SR = 'AWAITING_CHART_BACKLOG_BY_OWNER_SR';
export const REJECTED_CHART_BACKLOG_BY_OWNER_SR = 'REJECTED_CHART_BACKLOG_BY_OWNER_SR';


// Evolution
export const SUCCESS_CHARTEVOLUTION = 'SUCCESS_CHARTEVOLUTION';
export const AWAITING_CHARTEVOLUTION = 'AWAITING_CHARTEVOLUTION';
export const REJECTED_CHARTEVOLUTION = 'REJECTED_CHARTEVOLUTION';
    /* Backlog By Owner */
export const SUCCESS_CHART_BACKLOG_BY_OWNER_EVOLUTION = 'SUCCESS_CHART_BACKLOG_BY_OWNER_EVOLUTION';
export const AWAITING_CHART_BACKLOG_BY_OWNER_EVOLUTION = 'AWAITING_CHART_BACKLOG_BY_OWNER_EVOLUTION';
export const REJECTED_CHART_BACKLOG_BY_OWNER_EVOLUTION = 'REJECTED_CHART_BACKLOG_BY_OWNER_EVOLUTION';


// Params
    /* YearsIn */
export const SUCCESS_YEARSIN = 'SUCCESS_YEARSIN';
export const AWAITING_YEARSIN = 'AWAITING_YEARSIN';
export const REJECTED_YEARSIN = 'REJECTED_YEARSIN';
    /* YearsOut */
export const SUCCESS_YEARSOUT = 'SUCCESS_YEARSOUT';
export const AWAITING_YEARSOUT = 'AWAITING_YEARSOUT';
export const REJECTED_YEARSOUT = 'REJECTED_YEARSOUT';


// Chart Colors
export const COLOR_TEAL = '#008080';
export const COLOR_ORANGE = '#e6765b';
export const COLOR_BLUE = '#007fc9';
export const COLOR_YELLOW = '#f0d461';
export const COLOR_RED = '#d44320';


export const APIS = {
    // Anomalie Backlog
    getBacklogAnomalyOneMonth: '/api/GetBacklog/anomalie?take=4',
    getBacklogAnomalyThreeMonth: '/api/GetBacklog/anomalie?take=13',
    getBacklogAnomalySixMonth: '/api/GetBacklog/anomalie?take=26',
    getBacklogAnomalyOneYear: '/api/GetBacklog/anomalie?take=52',
    getBacklogAnomalyAll: '/api/GetBacklog/anomalie',
    

    // SR Backlog
    getBacklogSrOneMonth: '/api/GetBacklog/sr?take=4',
    getBacklogSrThreeMonth: '/api/GetBacklog/sr?take=13',
    getBacklogSrSixMonth: '/api/GetBacklog/sr?take=26',
    getBacklogSrOneYear: '/api/GetBacklog/sr?take=52',
    getBacklogSrAll: '/api/GetBacklog/sr',
    

    // Evolution Backlog
    getBacklogEvolutionOneMonth: '/api/GetBacklog/evolution?take=4',
    getBacklogEvolutionThreeMonth: '/api/GetBacklog/evolution?take=13',
    getBacklogEvolutionSixMonth: '/api/GetBacklog/evolution?take=26',
    getBacklogEvolutionOneYear: '/api/GetBacklog/evolution?take=52',
    getBacklogEvolutionAll: '/api/GetBacklog/sr',

    // BacklogByOwner
    getBacklogByOwner:'/api/BacklogByOwner',

    // Params
    getYearsIn: '/api/Filters/GetYears/In',
    getYearsOut: '/api/Filters/GetYears/Out',

    upload:'/api/upload',
    registerUser: '/api/users/register',
    loginUser: '/api/users/authenticate',
    API: 'Authenticate',
};
