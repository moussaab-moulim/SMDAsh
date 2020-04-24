const initalState = {
  loading: false,
  dataTable:[],
  data: {
    datasets: [{
      label: 'In',
      data: [],
     
      backgroundColor: "#0066cc", 
      },
      {
          label: 'Out',
          data: [],
         
          backgroundColor: "#ff4500",
          
      }, 
      {
      label: 'line Backlog',
      data: [],
      order: 1,
      type: 'line',
      fill: false,
      backgroundColor: "#0066cc",
      borderColor: "#0066cc",
      }, 
      {
      label: 'Line Teal Backlog',
      data: [],
      order: 1,
      type: 'line',
      fill: false,
      backgroundColor: "#ffbf00",
      borderColor: "#ffbf00",
      }, 
      {
      label: 'Line OCP Backlog',
      data: [],
      order: 1,
      type: 'line',
      fill: false,
      backgroundColor: "#cc0000",
      borderColor: "#cc0000"
      }],

      labels: []  
  }
};

const chartAnoReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AWAITING_CHARTANO":
      return {
        ...state,
        loading: true
      }
    case "REJECTED_CHARTANO":
      return {
        ...state,
        loading: false,
      }
    case "SUCCESS_CHARTANO":
      return {
        ...state,
        loading: false,
        dataTable: payload.dataTable,
        data: { datasets: [{
          label: 'In',
          data: payload.dataIn,
          backgroundColor: "#0066cc", 
          },
          {
              label: 'Out',
              data: payload.dataOut,
              backgroundColor: "#ff4500",
              
          }, 
          {
          label: 'line Backlog',
          data: payload.dataLineBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: "#0066cc",
          borderColor: "#0066cc",
          }, 
          {
          label: 'Line Teal Backlog',
          data: payload.dataTealBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: "#ffbf00",
          borderColor: "#ffbf00",
          }, 
          {
          label: 'Line OCP Backlog',
          data: payload.dataOCPBacklog,
          order: 1,
          type: 'line',
          fill: false,
          backgroundColor: "#cc0000",
          borderColor: "#cc0000"
          }],
    
          labels: payload.labels
        }
      }
    default:
      return state;
  }
  return state;
}

export default chartAnoReducer;
