import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getTicketAssignedOcpSr(category="sr", service="ocp") { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_CHART_TICKET_ASSIGNED_OCP_SR,
      });
      
      axios.get(constants.APIS.getTicketAssigned+"/"+category+"/"+service)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHART_TICKET_ASSIGNED_OCP_SR,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHART_TICKET_ASSIGNED_OCP_SR,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getTicketAssignedRunServiceSr(category="sr", service="run service") { 
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR,
      });
      
      axios.get(constants.APIS.getTicketAssigned+"/"+category+"/"+service)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
