import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getSlaByProjectYearOutSr(category="sr", year="all", week="all") { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_CHART_SLA_PROJECT_BY_YEAROUT_SR,
      });
      
      axios.get(constants.APIS.getSlaByProject+"/"+category+"/"+year+"/"+week)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHART_SLA_PROJECT_BY_YEAROUT_SR,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHART_SLA_PROJECT_BY_YEAROUT_SR,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}