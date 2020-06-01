import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const chartAnoReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHARTANO:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHARTANO:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHARTANO:
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
