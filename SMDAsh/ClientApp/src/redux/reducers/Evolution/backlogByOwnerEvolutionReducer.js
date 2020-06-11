import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const backlogByOwnerEvolutionReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHART_BACKLOG_BY_OWNER_EVOLUTION:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHART_BACKLOG_BY_OWNER_EVOLUTION:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHART_BACKLOG_BY_OWNER_EVOLUTION:
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

export default backlogByOwnerEvolutionReducer;
