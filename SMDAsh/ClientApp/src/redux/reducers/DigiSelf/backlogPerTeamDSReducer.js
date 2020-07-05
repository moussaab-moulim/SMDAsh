import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

const backlogPerTeamDSReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_BACKLOG_PER_TEAM_DIGISELF:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_BACKLOG_PER_TEAM_DIGISELF:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_BACKLOG_PER_TEAM_DIGISELF:
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

export default backlogPerTeamDSReducer;
