const initalState = {
  loading: true,
  dataTable:[]
};

const chartSrReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AWAITING_CHARTSR":
      return {
        ...state,
        loading: true
      }
    case "REJECTED_CHARTSR":
      return {
        ...state,
        loading: false,
      }
    case "SUCCESS_CHARTSR":
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

export default chartSrReducer;
