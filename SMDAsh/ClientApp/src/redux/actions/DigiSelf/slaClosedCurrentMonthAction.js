import axios from 'axios';
import * as constants from '../../constants';


export function getSlaClosed(sharepoint="false",team="all") { 
  
  return function(dispatch) {
      dispatch({
        type: constants.AWAITING_SLA_CLOSED_DIGISELF,
      });
      
      axios.get(constants.APIS.getSlaClosed + sharepoint + "/" + team)
        .then(function(response){
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_SLA_CLOSED_DIGISELF,
            payload: arr
          })
        })
        .catch((error) => {
          dispatch({
            type: constants.REJECTED_SLA_CLOSED_DIGISELF,
            payload: error.message || 'Unexpected Error!!!'
          })
        });
    } 
}
