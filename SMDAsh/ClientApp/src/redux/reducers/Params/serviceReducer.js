import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const servicesReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_SERVICES:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_SERVICES:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_SERVICES:
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