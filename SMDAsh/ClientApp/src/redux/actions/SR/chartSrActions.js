import axios from 'axios';
import * as constants from '../../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: constants.SUCCESS_CHARTSR,
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogSrOneMonth() {
  return function(dispatch, getState) {
    dispatch({
      type: constants.AWAITING_CHARTSR,
    });
    axios.get(constants.APIS.getBacklogSrOneMonth)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_CHARTSR,
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.REJECTED_CHARTSR,
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
export function getBacklogSrThreeMonth() {
  return function(dispatch, getState) {
    dispatch({
      type: constants.AWAITING_CHARTSR,
    });
    axios.get(constants.APIS.getBacklogSrThreeMonth)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_CHARTSR,
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.REJECTED_CHARTSR,
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
export function getBacklogSrSixMonth() {
  return function(dispatch, getState) {
    dispatch({
      type: constants.AWAITING_CHARTSR,
    });
    axios.get(constants.APIS.getBacklogSrSixMonth)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_CHARTSR,
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.REJECTED_CHARTSR,
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
export function getBacklogSrOneYear() {
  return function(dispatch, getState) {
    dispatch({
      type: constants.AWAITING_CHARTSR,
    });
    axios.get(constants.APIS.getBacklogSrOneYear)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_CHARTSR,
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.REJECTED_CHARTSR,
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
export function getBacklogSrAll() {
  return function(dispatch, getState) {
    dispatch({
      type: constants.AWAITING_CHARTSR,
    });
    axios.get(constants.APIS.getBacklogSrAll)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_CHARTSR,
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.REJECTED_CHARTSR,
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
