import { combineReducers } from 'redux';
import chartAnoReducer from "./chartAnoReducer";
import user from './auth/userReducer';
import loading from './loadingReducer';


const rootReducer = combineReducers({ 
    user, 
    loading,
    chartAno:chartAnoReducer
});

export default rootReducer;
