const initalState = {
    loading: false,
    dataTable:[],
    total:0,
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: []
        }] 
    }
  };
  
const rpaAnoReducer = (state = initalState, action) => {
    const { type, payload } = action;
   
    switch (type) {
      case "AWAITING_RPAANO":
        return {
          ...state,
          loading: true
        }
      case "REJECTED_RPAANO":
        return {
          ...state,
          loading: false,
        }
      case "SUCCESS_RPAANO":
        return {
          ...state,
          loading: false,
          total: payload.total,
          dataTable: payload.dataTable,
          data: { 
            datasets: [{
                data: payload.counts,
                backgroundColor: payload.backgroundColor,
                hoverBackgroundColor: payload.hoverBackgroundColor
            }],
            labels: payload.labels
          }
        }
      default:
        return state;
    }
    return state;
  }
  
  export default rpaAnoReducer;
  