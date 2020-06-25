import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const slaByProjectYearOutEvolutionReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHART_SLA_PROJECT_BY_YEAROUT_EVOLUTION:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHART_SLA_PROJECT_BY_YEAROUT_EVOLUTION:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHART_SLA_PROJECT_BY_YEAROUT_EVOLUTION:
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