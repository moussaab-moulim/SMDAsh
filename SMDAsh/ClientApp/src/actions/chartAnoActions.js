import axios from 'axios';
import moment from 'moment';

export const getData = () => async (dispatch) => {
  try {
    dispatch({
      type: 'AWAITING_CHARTANO',
    });

  
    const response = await axios.get(
      `api/GetBacklog/mantis/anomalie`
    );
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
      dataIn.push(data[i].in);
      dataOut.push(data[i].out);
      dataLineBacklog.push(data[i].backlog);
      //response.data[i].TealBacklog
      dataTealBacklog.push(0);
      //response.data[i].OCPBacklog
      dataOCPBacklog.push(0);
      labels.push(data[i].yearWeek.substring(0,-2));
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
