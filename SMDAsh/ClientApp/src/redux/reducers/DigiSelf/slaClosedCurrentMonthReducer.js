import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const slaClosedCurrentMonthReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_SLA_CLOSED_DIGISELF:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_SLA_CLOSED_DIGISELF:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_SLA_CLOSED_DIGISELF:
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

export default slaClosedCurrentMonthReducer;
