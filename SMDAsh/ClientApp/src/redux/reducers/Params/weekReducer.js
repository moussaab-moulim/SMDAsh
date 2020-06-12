import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const weeksReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case constants.AWAITING_WEEKS:
        return {
          ...state,
          loading: true
        }
      case constants.REJECTED_WEEKS:
        return {
          ...state,
          loading: false,
        }
      case constants.SUCCESS_WEEKS:
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

export const weeksInReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_WEEKSIN:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_WEEKSIN:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_WEEKSIN:
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
export const weeksOutReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case constants.AWAITING_WEEKSOUT:
        return {
          ...state,
          loading: true
        }
      case constants.REJECTED_WEEKSOUT:
        return {
          ...state,
          loading: false,
        }
      case constants.SUCCESS_WEEKSOUT:
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


