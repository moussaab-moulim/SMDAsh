import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getWeeks() { 
    return function(dispatch) {
      
        dispatch({
          type: constants.AWAITING_WEEKS,
        });
        
        axios.get(constants.APIS.getWeeks)
          .then(function(response){
   
            var arr = response.data;
            dispatch({
              type: constants.SUCCESS_WEEKS,
              payload: arr
            })
          })
          .catch((error) => {
            
            dispatch({
              type: constants.REJECTED_WEEKS,
              payload: error.message || 'Unexpected Error!!!'
            })
            
          });
      } 
}
export function getWeeksIn() { 
    return function(dispatch) {
      
        dispatch({
          type: constants.AWAITING_WEEKSIN,
        });
        
        axios.get(constants.APIS.getWeeksIn)
          .then(function(response){
   
            var arr = response.data;
            dispatch({
              type: constants.SUCCESS_WEEKSIN,
              payload: arr
            })
          })
          .catch((error) => {
            
            dispatch({
              type: constants.REJECTED_WEEKSIN,
              payload: error.message || 'Unexpected Error!!!'
            })
            
          });
      } 
}
export function getWeeksOut() { 
    return function(dispatch) {
      
        dispatch({
          type: constants.AWAITING_WEEKSOUT,
        });
        
        axios.get(constants.APIS.getWeeksOut)
          .then(function(response){
   
            var arr = response.data;
            dispatch({
              type: constants.SUCCESS_WEEKSOUT,
              payload: arr
            })
          })
          .catch((error) => {
            
            dispatch({
              type: constants.REJECTED_WEEKSOUT,
              payload: error.message || 'Unexpected Error!!!'
            })
            
          });
      } 
}
