import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogEvolutionByAgeDSOneWeek() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeOneWeek)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionByAgeDSOneMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeOneMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionByAgeDSThreeMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeThreeMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionByAgeDSSixMonth() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeSixMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionByAgeDSOneYear() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeOneYear)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionByAgeDSAll() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfByAgeAll)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_EVOLUTION_BY_AGE_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
