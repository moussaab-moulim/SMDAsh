import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const backlogInOutDaysDSReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_BACKLOG_IN_OUT_BY_DAYS_DIGISELF:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_BACKLOG_IN_OUT_BY_DAYS_DIGISELF:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_BACKLOG_IN_OUT_BY_DAYS_DIGISELF:
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

export default backlogInOutDaysDSReducer;
