import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getApplications(projectCourt="--") { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_APPLICATIONS,
      });

      if(projectCourt == true || projectCourt == false){
        axios.get(constants.APIS.getGetApplications+"?projectCourt="+projectCourt)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_APPLICATIONS,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_APPLICATIONS,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });

      }else{
        axios.get(constants.APIS.getGetApplications)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_APPLICATIONS,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_APPLICATIONS,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });

      }

    } 
}
