import axios from "axios";
import moment from "moment";

export const getData = () => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_RPAANO"
    })
    const response = await axios.get(`http://localhost:3010/rpa`);
    const responsee = await axios.get(`https://localhost:44334/weatherforecast`);
    const respData = response.data;
   

    const dataTable = [];
    let total = 0;
    const labels = [];
    const counts = [];

   

    const backgroundColor = [];
    const hoverBackgroundColor = [];

    
    const dynamicColors = function() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
    };

    
    for (let i = 0; i < respData[0].data.length; i++) {
      labels.push(respData[0].data[i].Project)
      dataTable.push(respData[0].data[i])
      counts.push(respData[0].data[i].Count)
      backgroundColor.push(dynamicColors());
      hoverBackgroundColor.push(dynamicColors());
      total += respData[0].data[i].Count;
    }
   

    
    


    dispatch({
      type: "SUCCESS_RPAANO",
      payload: {
        labels,
        counts,
        total,
        dataTable,
        backgroundColor,
        hoverBackgroundColor
      }
    })
   

  } catch (e) {
    dispatch({
      type: "REJECTED_RPAANO",
    })
  }
}
