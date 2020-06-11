import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
//export function getBacklogByOwnerAnomaly(category, year) { 
export function getBacklogByOwnerAnomaly(category, year) { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_CHART_BACKLOG_BY_OWNER_ANO,
      });
      
      axios.get(constants.APIS.getBacklogByOwner+"/"+category+"/"+year)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHART_BACKLOG_BY_OWNER_ANO,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHART_BACKLOG_BY_OWNER_ANO,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
