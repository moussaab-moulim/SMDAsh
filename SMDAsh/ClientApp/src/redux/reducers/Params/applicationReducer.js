import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const ApplicationBarReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_APPLICATIONSBAR:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_APPLICATIONSBAR:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_APPLICATIONSBAR:
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
export const ApplicationProjectCourtTrueReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_APPLICATIONSPROJECTCOURTTRUE:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_APPLICATIONSPROJECTCOURTTRUE:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_APPLICATIONSPROJECTCOURTTRUE:
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
export const ApplicationProjectCourtFalseReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_APPLICATIONSPROJECTCOURTFALSE:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_APPLICATIONSPROJECTCOURTFALSE:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_APPLICATIONSPROJECTCOURTFALSE:
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

