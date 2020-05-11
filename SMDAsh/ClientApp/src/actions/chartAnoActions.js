import axios from 'axios';
import moment from 'moment';
import constants from '../constants';

//Action to get all Repos
export function getData(response) {
  return{
    type: 'SUCCESS_CHARTANO',
    payload: response
  }
}
// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getDataThunk() {
  return function(dispatch, getState) {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });
    axios.get(constants.APIS.getBacklog)
      .then(function(response){
        var arr = response.data;
        dispatch({
          type: 'SUCCESS_CHARTANO',
          payload: arr
        })
      })
      .catch((error) => {
        console.error(error,"ERRRRRORRR");
        dispatch({
          type: 'REJECTED_CHARTANO',
          payload: error.message || 'Unexpected Error!!!'
        })
      });
  }
}
/* Repo selected action
export function repoSelected(repo){
  return{
    type: 'Repo_Selected',
    payload: repo
  }
}*/
export const getData2 = () => async (dispatch) => {
  try {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });
    const response = await axios.get(constants.APIS.getBacklog);
    //http://tealtest1.azurewebsites.net

    const data = response.data;
    
    const dataTable = [];
    const labels = [];
    const dataIn = [];
    const dataOut = [];
    const dataLineBacklog = [];
    const dataTealBacklog = [];
    const dataOCPBacklog = [];
    
    for (let i = 0; i < data.length; i++) {

      dataTable.push(data[i]);
      dataIn.push(data[i].In);
      dataOut.push(data[i].Out);
      dataLineBacklog.push(data[i].Backlog);
      //response.data[i].TealBacklog
      dataTealBacklog.push(0);
      //response.data[i].OCPBacklog
      dataOCPBacklog.push(0);
      labels.push(data[i].YearWeek);
    }
    //labels.push("2017W20");
    //labels.push("2017W21");
    //labels.push("2017W22");


    


    dispatch({
      type: 'SUCCESS_CHARTANO',
      payload: {
        labels,
        dataIn,
        dataOut,
        dataLineBacklog,
        dataTealBacklog,
        dataOCPBacklog,
        dataTable,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_CHARTANO',
    });
  }
};
