import { combineReducers } from 'redux';
import chartAnoReducer from "./auth/chartAnoReducer";
import user from './userReducer';
import loading from './loadingReducer';
import notes from './notesReducer';

const rootReducer = combineReducers({ 
    user, 
    loading,
    notes,
    chartAnoReducer
});

export default rootReducer;
