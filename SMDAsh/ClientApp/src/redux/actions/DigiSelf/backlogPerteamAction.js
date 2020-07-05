import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getBacklogPerTeamDigiSelf() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_BACKLOG_PER_TEAM_DIGISELF,
      });
      
      axios.get(constants.APIS.getBacklogDigiSelfPerTeam)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_BACKLOG_PER_TEAM_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_BACKLOG_PER_TEAM_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
