import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getYearsIn() { 
  
  return function(dispatch, getState) {
      
      dispatch({
        type: constants.AWAITING_YEARSIN,
      });
      
      axios.get(constants.APIS.getYearsIn)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_YEARSIN,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_YEARSIN,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}
export function getYearsOut() { 
  
    return function(dispatch, getState) {
        
        dispatch({
          type: constants.AWAITING_YEARSOUT,
        });
        
        axios.get(constants.APIS.getYearsOut)
          .then(function(response){
   
            var arr = response.data;
            dispatch({
              type: constants.SUCCESS_YEARSOUT,
              payload: arr
            })
          })
          .catch((error) => {
            
            dispatch({
              type: constants.REJECTED_YEARSOUT,
              payload: error.message || 'Unexpected Error!!!'
            })
            
          });
      } 
  }

