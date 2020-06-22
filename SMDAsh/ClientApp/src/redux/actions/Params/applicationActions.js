import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.

export function getApplicationsBar() { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_APPLICATIONSBAR,
      });

      axios.get(constants.APIS.getApplicationsBar)
      .then(function(response){

        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_APPLICATIONSBAR,
          payload: arr
        })
      })
      .catch((error) => {
        
        dispatch({
          type: constants.REJECTED_APPLICATIONSBAR,
          payload: error.message || 'Unexpected Error!!!'
        })
        
      });

    } 
}

export function getApplicationsProjectCourtTrue() { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_APPLICATIONSPROJECTCOURTTRUE,
      });

      axios.get(constants.APIS.getApplicationsProjectCourtTrue)
      .then(function(response){

        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_APPLICATIONSPROJECTCOURTTRUE,
          payload: arr
        })
      })
      .catch((error) => {
        
        dispatch({
          type: constants.REJECTED_APPLICATIONSPROJECTCOURTTRUE,
          payload: error.message || 'Unexpected Error!!!'
        })
        
      });

    } 
}

export function getApplicationsProjectCourtFalse() { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_APPLICATIONSPROJECTCOURTFALSE,
      });

      axios.get(constants.APIS.getApplicationsProjectCourtFalse)
      .then(function(response){

        var arr = response.data;
        dispatch({
          type: constants.SUCCESS_APPLICATIONSPROJECTCOURTFALSE,
          payload: arr
        })
      })
      .catch((error) => {
        
        dispatch({
          type: constants.REJECTED_APPLICATIONSPROJECTCOURTFALSE,
          payload: error.message || 'Unexpected Error!!!'
        })
        
      });

    } 
}
