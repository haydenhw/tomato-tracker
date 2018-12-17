import * as actions from '../actions/indexActions';

const defaultState = {
  intervalId: null,
  isTimerActive: false,
  isDesktopNotificationActive: false,
  remainingTime: null,
  startTime: 25 * 60,
  taskStartedTime: null,
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
    case actions.ADD_ENTRY:
      return {
        ...state,
        taskStartedTime: new Date().getTime(),
      }
    case actions.DECREMENT_TIMER:
      return {
        ...state,
        remainingTime: state.remainingTime - 1
      }
    case actions.HANDLE_TIMER_COMPLETE:
      return {
        ...state,
        isDesktopNotificationActive: !state.isDesktopNotificationActive,
        isTimerActive: !state.isTimerActive,
        remainingTime: state.startTime,
      }
    case actions.RESET_TIMER:
      return {
        ...state,
        remainingTime: state.startTime
      }
    case actions.SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.intervalId
      }
    case actions.SET_START_TIME:
      return {
        ...state,
        isTimerActive: action.shouldToggleTimer ? !state.isTimerActive : state.isTimerActive,
        startTime: action.startTime,
        remainingTime: action.startTime,
        taskStartedTime: action.shouldToggleTimer ? new Date().getTime(): null,

      }
    case actions.TOGGLE_DESKTOP_NOTIFICATION:
      return {
        ...state,
        isDesktopNotificationActive: !state.isDesktopNotificationActive
      }
    case actions.TOGGLE_TIMER:
      return {
        ...state,
        isTimerActive: !state.isTimerActive,
        remainingTime: state.startTime,
        taskStartedTime: state.isTimerActive ? null :  new Date().getTime(),
      }
    default:
      return state;
  }
}
