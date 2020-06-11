import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const yearsInReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_YEARSIN:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_YEARSIN:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_YEARSIN:
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
export const yearsOutReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case constants.AWAITING_YEARSOUT:
        return {
          ...state,
          loading: true
        }
      case constants.REJECTED_YEARSOUT:
        return {
          ...state,
          loading: false,
        }
      case constants.SUCCESS_YEARSOUT:
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


