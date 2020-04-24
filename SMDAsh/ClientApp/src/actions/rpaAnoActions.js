import axios from "axios";
import moment from "moment";

export const getData = () => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_RPAANO"
    })
    //const response = await axios.get(`http://localhost:3010/rpa`);
    const response = await axios.get(`https://localhost:44334/weatherforecast`);
    const data = response.data;
   


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

    
    for (let i = 0; i < data.length; i++) {
      labels.push(data[i].project);
      dataTable.push(data[i]);
      counts.push(data[i].count);
      backgroundColor.push(dynamicColors());
      hoverBackgroundColor.push(dynamicColors());
      total += data[i].count;
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
