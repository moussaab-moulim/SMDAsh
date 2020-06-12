import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const ApplicationReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_APPLICATIONS:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_APPLICATIONS:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_APPLICATIONS:
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

