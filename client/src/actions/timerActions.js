import * as actions from '../actions/indexActions';
import { timeStringToSeconds } from '../helpers/time';

export const DECREMENT_TIMER = "DECREMENT_TIMER";
export function decrementTimer() {
  return {
    type: "DECREMENT_TIMER"
  }
}

export const TOGGLE_DESKTOP_NOTIFICATION = "TOGGLE_DESKTOP_NOTIFICATION";
export function toggleDesktopNotification() {
  return {
    type: "TOGGLE_DESKTOP_NOTIFICATION"
  }
}

export const HANDLE_TIMER_COMPLETE = "HANDLE_TIMER_COMPLETE";
export function handleTimerComplete(selectedTaskId) {
  return (dispatch) => {
    dispatch(actions.addEntry(selectedTaskId));
    dispatch({
        type: "HANDLE_TIMER_COMPLETE"
    });

    // fetch('/stop-entry', {
    //   method: 'put'
    // })
    // .catch(err => {
    //   console.log('The fetch request to toggl produced an error');
    // });

    setTimeout(() => dispatch(toggleDesktopNotification()), 1500);
  }
}

export const SET_INTERVAL_ID = "SET_INTERVAL_ID";
export function setIntervalId(intervalId) {
  return {
    type: "SET_INTERVAL_ID",
    intervalId
  }
}

export const TOGGLE_TIMER = "TOGGLE_TIMER";
export function toggleTimer(selectedTaskId) {
  return (dispatch, getState) => {
    const { isTimerActive } = getState().timer;

    if (isTimerActive) {
      document.title = 'Tomato Tracker';
      dispatch(actions.addEntry(selectedTaskId))

      // fetch('/stop-entry', {
      //   method: 'put',
      // });
    }

    dispatch({
      type: "TOGGLE_TIMER",
    });
  }
}

export const SET_START_TIME = "SET_START_TIME";
export function setStartTime(startTime, shouldToggleTimer) {
  return (dispatch, getState) => {
    startTime = isNaN(startTime) ? timeStringToSeconds(startTime, 'MMSS') : Math.ceil(Number(startTime) * 60);
    startTime = startTime === 'NAN_ERROR' ?  getState().timer.startTime : startTime;

    return dispatch({
      type: "SET_START_TIME",
      startTime,
      shouldToggleTimer
    });
  }
}

export const RESET_TIMER = "RESET_TIMER";
export function resetTimer() {
  return {
    type: "RESET_TIMER",
  }
}

export const INCREMENT_TASK_TIME = "INCREMENT_TASK_TIME";
export function incrementTaskTime(project, task) {
  return (dispatch) => {
    if (!task) {
      return null;
    }

    const updatedTask = Object.assign({}, task, { recordedTime: task.recordedTime + 1 })

    dispatch({
      type: "INCREMENT_TASK_TIME",
      projectId: project.shortId,
      taskId: task.shortId
    });


    fetch(`projects/${project._id}/tasks/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
