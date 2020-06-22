import * as constants from '../../constants';

const initalState = {
  loading: true,
  dataTable:[]
};

export const ticketAssignedOcpSrReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.AWAITING_CHART_TICKET_ASSIGNED_OCP_SR:
      return {
        ...state,
        loading: true
      }
    case constants.REJECTED_CHART_TICKET_ASSIGNED_OCP_SR:
      return {
        ...state,
        loading: false,
      }
    case constants.SUCCESS_CHART_TICKET_ASSIGNED_OCP_SR:
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

export const ticketAssignedRunServiceSrReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case constants.AWAITING_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR:
        return {
          ...state,
          loading: true
        }
      case constants.REJECTED_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR:
        return {
          ...state,
          loading: false,
        }
      case constants.SUCCESS_CHART_TICKET_ASSIGNED_RUN_SERVICE_SR:
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


