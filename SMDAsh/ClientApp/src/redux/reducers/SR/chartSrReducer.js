import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const chartSrReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHARTSR:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHARTSR:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHARTSR:
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
