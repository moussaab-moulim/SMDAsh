import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogDigiSelfOneWeek() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfOneWeek)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogDigiSelfOneMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfOneMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogDigiSelfThreeMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfThreeMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogDigiSelfOneYear() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfOneYear)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogDigiSelfAll() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfAll)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
