import axios from 'axios';
import * as constants from '../../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: constants.SUCCESS_CHARTANO,
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogAnomalyOneMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTANO,
      });
      
      axios.get(constants.APIS.getBacklogAnomalyOneMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogAnomalyThreeMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTANO,
      });
      
      axios.get(constants.APIS.getBacklogAnomalyThreeMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogAnomalySixMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTANO,
      });
      
      axios.get(constants.APIS.getBacklogAnomalySixMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogAnomalyOneYear() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTANO,
      });
      
      axios.get(constants.APIS.getBacklogAnomalyOneYear)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogAnomalyAll() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTANO,
      });
      
      axios.get(constants.APIS.getBacklogAnomalyAll)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
