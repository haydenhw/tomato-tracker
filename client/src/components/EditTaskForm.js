import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { secondsToHMMSS, timeStringToSeconds } from '../helpers/time';
import { hasAnyValue, isDuplicate } from '../helpers/validate';
import { confirmEditTask, updateTask } from '../actions/indexActions';

import 'rc-time-picker/assets/index.css';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="input-wrapper">
    <label/>
    <div>
      <input {...input} placeholder="Task name" type={type} />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
        (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  )
  
  let EditTaskForm = class extends Component {
    handleEditTaskSubmit ({ taskName, newTime }) {
      const {
        activeProjectId,
        clickedTaskId,
        confirmEditTask,
        updateTask,
        initialValues,
        selectedProject,
        selectedTask,
        taskNames,
      } = this.props
      const newTimeString = timeStringToSeconds(newTime);
      
      if (taskName !== initialValues.taskName && isDuplicate(taskName, taskNames)){
        throw new SubmissionError({
          taskName: `A task with the name ${taskName} already exits`
        });      
      }
      
      if (!hasAnyValue(taskName)){
        throw new SubmissionError({
          taskName: `This field cannot be left blank`
        });      
      }
      
      if (isNaN(newTimeString)) {
        throw new SubmissionError({
          newTime: 'Please enter a numberic time'
        });
      }
      
      const toUpdate = {
        taskName,
        recordedTime: newTimeString
      } 
      console.log(selectedTask)
      if (secondsToHMMSS(newTimeString)  !== initialValues.newTime)  {
        confirmEditTask({
          taskName,
          payload:  [selectedProject, selectedTask, toUpdate],
          oldTime: initialValues.newTime,
          newTime: secondsToHMMSS(newTimeString) 
        })
      } else if (taskName !== initialValues.taskName) {
        updateTask(selectedProject, selectedTask, toUpdate);
      }
    }
    
  render() {
    const { handleSubmit, initialValues } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.handleEditTaskSubmit.bind(this))}>
        <div>
        </div>
        <label>Task Name</label>
        <div>
          <Field
            name="taskName"
            component={renderField}
            type="text"
          />
        </div>
        <div>
          <span className='current-time'>Logged Time: {initialValues.recordedTime} </span>
        </div>
        <div>
          <Field
            name="newTime"
            component={renderField}
            type="text"
          />
          <input type="submit"/>
        </div>
      </form>
    );
  }
};
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditTaskForm = reduxForm({
  form: 'EditTaskForm', // a unique identifier for this form
})(EditTaskForm);

const mapStateToProps = (state, ownProps) => {
  const { activeProjectId, projects } = state;
  //const { clickedTaskId } = ownProps;
  
  // change this
  const clickedTaskId = 'rJgV_UIjXW';
  const selectedProject = projects.find((project) => project.shortId === activeProjectId);  
  const taskNames = selectedProject.tasks.map((task) => task.taskName);
  const selectedTask = projects.concatMap((project) => project.tasks).find((task) => clickedTaskId === task.shortId) 
  
  return ({
    activeProjectId,
    clickedTaskId, 
    selectedProject,
    selectedTask,
    taskNames, 
    initialValues: {
      taskName: 'harry' || selectedTask.taskName,
      newTime:'0:02:29' || secondsToHMMSS(selectedTask.recordedTime)
    },
  })
}

EditTaskForm = connect( mapStateToProps, { 
  confirmEditTask,
  updateTask
 })(EditTaskForm);

export default EditTaskForm;