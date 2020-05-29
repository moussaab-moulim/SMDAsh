import axios from 'axios';
import * as constants from '../../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: 'SUCCESS_CHARTSR',
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getDataThunk() {
  return function(dispatch, getState) {
    dispatch({
      type: 'AWAITING_CHARTSR',
    });
    axios.get(constants.APIS.getBacklogSr)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: 'SUCCESS_CHARTSR',
          payload: arr
        })
      })
      .catch((error) => {
        dispatch({
          type: 'REJECTED_CHARTSR',
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
