const initalState = {
  loading: true,
  dataTable:[]
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
        dataTable: payload
      }
    default:
      return state;
  }
  return state;
}

export default chartAnoReducer;
