import axios from 'axios';
import * as constants from '../../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: constants.SUCCESS_CHARTEVOLUTION, 
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogEvolutionOneMonth() {
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTEVOLUTION,
      });
      
      axios.get(constants.APIS.getBacklogEvolutionOneMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTEVOLUTION,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTEVOLUTION,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionThreeMonth() {
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTEVOLUTION,
      });
      
      axios.get(constants.APIS.getBacklogEvolutionThreeMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTEVOLUTION,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTEVOLUTION,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionSixMonth() {
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTEVOLUTION,
      });
      
      axios.get(constants.APIS.getBacklogEvolutionSixMonth)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTEVOLUTION,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTEVOLUTION,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionOneYear() {
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTEVOLUTION,
      });
      
      axios.get(constants.APIS.getBacklogEvolutionOneYear)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTEVOLUTION,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTEVOLUTION,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getBacklogEvolutionAll() {
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_CHARTEVOLUTION,
      });
      
      axios.get(constants.APIS.getBacklogEvolutionAll)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHARTEVOLUTION,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHARTEVOLUTION,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}