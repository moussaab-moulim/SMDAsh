import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const chartEvolutionReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHARTEVOLUTION:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHARTEVOLUTION:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHARTEVOLUTION:
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

export default chartEvolutionReducer;
