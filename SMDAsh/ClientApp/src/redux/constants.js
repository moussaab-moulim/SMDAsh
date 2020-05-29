export const API = 'Authenticate';

// User
export const SET_USER_INFO = 'SET_USER_INFO';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const RESET_USER_INFO = 'RESET_USER_INFO';

// Anomaly
export const SUCCESS_CHARTANO = 'SUCCESS_CHARTANO';
export const AWAITING_CHARTANO = 'AWAITING_CHARTANO';
export const REJECTED_CHARTANO = 'REJECTED_CHARTANO';

// SR
export const SUCCESS_CHARTSR = 'SUCCESS_CHARTSR';
export const AWAITING_CHARTSR = 'AWAITING_CHARTSR';
export const REJECTED_CHARTSR = 'REJECTED_CHARTSR';



export const APIS = {
    getBacklogAnomaly: '/api/GetBacklog/anomalie',
    getBacklogSr: '/api/GetBacklog/sr',
    upload:'/api/upload',
    registerUser: '/api/users/register',
    loginUser: '/api/users/authenticate',
    API: 'Authenticate',
};
