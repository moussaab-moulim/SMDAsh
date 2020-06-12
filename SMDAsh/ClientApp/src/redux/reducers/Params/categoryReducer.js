import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const categoriesReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CATEGORIES:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CATEGORIES:
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