import axios from 'axios';
import moment from 'moment';

export const getData = () => async (dispatch) => {
  try {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });

    const website = `http://localhost:44381`;
    const route = `/api/Tickets/sm.BacklogInOut(Category='Anomalie',YearWeek=['2017W20','2017W21','2017W22'])`;
    const response = await axios.get(
      `http://tealtest1.azurewebsites.net/api/Tickets/sm.BacklogInOut(Category='Anomalie',YearWeek=['2017W20','2017W21','2017W22'])`
    );
    //http://tealtest1.azurewebsites.net

    const data = JSON.parse(response.data.value);

    //console.log("api",data.length);

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
      labels.push(data[i].Week);
    }

   
    

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
