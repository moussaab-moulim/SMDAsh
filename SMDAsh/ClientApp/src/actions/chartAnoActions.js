import axios from 'axios';
import moment from 'moment';

export const getData = () => async (dispatch) => {
  try {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });

  
    const response = await axios.get(
      `api/Tickets/GetBacklogByYearWeek(Category='Anomalie',YearWeek=['2017W20','2017W21','2017W22','2017W23'])`
    );
    const data = response.data.value;


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
