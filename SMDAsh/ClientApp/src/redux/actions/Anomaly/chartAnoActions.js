import axios from 'axios';
import * as constants from '../../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: 'SUCCESS_CHARTANO',
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getDataThunk() {
  return function(dispatch, getState) {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });
    axios.get(constants.APIS.getBacklogAnomaly)
      .then(function(response){
        console.log(response);
        var arr = response.data;
        dispatch({
          type: 'SUCCESS_CHARTANO',
          payload: arr
        })
      })
      .catch((error) => {
        console.error(error,"ERRRRRORRR");
        dispatch({
          type: 'REJECTED_CHARTANO',
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
