import axios from 'axios';
import * as constants from '../../constants';

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getCategories() { 
  
  return function(dispatch) {
      
      dispatch({
        type: constants.AWAITING_CATEGORIES,
      });
      
      axios.get(constants.APIS.getCategories)
        .then(function(response){
 
          var arr = response.data;
          dispatch({
            type: constants.SUCCESS_CATEGORIES,
            payload: arr
          })
        })
        .catch((error) => {
          
          dispatch({
            type: constants.REJECTED_CATEGORIES,
            payload: error.message || 'Unexpected Error!!!'
          })
          
        });
    } 
}