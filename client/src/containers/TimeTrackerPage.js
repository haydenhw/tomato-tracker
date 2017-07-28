import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteTask,
  decrementTimer,
  changeActiveEditMenu,
  fetchProjects,
  setSelectedProject,
  setTempTasks,
  toggleAddTasksForm,
  toggleConfig,
  toggleEditTaskForm,
  toggleOnboardMode
} from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  shouldComponentUpdate(nextProps) {
    const { isModalActive, selectedProjectId } = this.props;
    
    if (this.props.selectedProjectId && (nextProps.selectedProjectId !== this.props.selectedProjectId) && isModalActive) {
      
      return false;
    } 
    
    return true;
  }
  render() {
    const { 
      changeActiveEditMenu,
      decrementTimer,
      deleteTask,
      hasFetched,
      isFetching,
      isModalActive,
      isModalClosing,
      isOnboardingActive,
      isTimerActive,
      projects,
      selectedProjectId,
      setSelectedProject,
      setTempTasks,
      toggleAddTasksForm, 
      toggleConfig,
      toggleEditTaskForm,
      toggleOnboardMode
    } = this.props;
  
    if (!hasFetched) {
      return <div className="loader">Loading...</div>
    }
    
    const selectedProjectIndex = selectedProjectId && projects.findIndex(project => project.shortId === selectedProjectId);
    const selectedProject = (selectedProjectIndex !== null && !isNaN(selectedProjectIndex)) && projects[selectedProjectIndex];
    const selectedTasks = selectedProject && selectedProject.tasks;
    
    return (
      <div className="time-tracker-page-container">
        <TimeTracker
          changeActiveEditMenu={changeActiveEditMenu}
          decrementTimer={decrementTimer}
          deleteTask={deleteTask}
          projects={projects}
          hasFetched={hasFetched}
          isFetching={isFetching}
          isModalActive={isModalActive}
          isModalClosing={isModalClosing}
          isOnboardingActive={isOnboardingActive}
          isTimerActive={isTimerActive}
          selectedProject={selectedProject || null}
          setSelectedProject={setSelectedProject}
          setTempTasks={setTempTasks}
          tasks={selectedTasks || []}
          toggleAddTasksForm={toggleAddTasksForm} 
          toggleConfig={toggleConfig}
          toggleEditTaskForm={toggleEditTaskForm}
          toggleOnboardMode={toggleOnboardMode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {  modal, projects, timer, selectedProjectId } = state;
  const { hasFetched, isFetching } = projects;
  const { isModalActive, isModalClosing, isOnboardingActive } = modal;
  const { isTimerActive } = timer;
  
  return {
    selectedProjectId,
    hasFetched, 
    isFetching,
    isModalActive,
    isModalClosing,
    isOnboardingActive,
    isTimerActive, 
    projects: projects.items
  }
}

export default connect(mapStateToProps, {
  changeActiveEditMenu,
  decrementTimer,
  deleteTask,
  fetchProjects,
  setSelectedProject,
  setTempTasks,
  toggleAddTasksForm,
  toggleConfig,
  toggleEditTaskForm, 
  toggleOnboardMode
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
