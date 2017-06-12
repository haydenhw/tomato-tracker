import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function DropdownTrigger(props) {
  const { children, isActive } = props;

  const renderContent = () => {
    const { isActive } = props;

    if (isActive) {
      return (
        <ul className="dropdown-content">
          {children}
        </ul>
      );

      return null;
    }
  };

  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {renderContent()}
      </ReactCSSTransitionGroup>
    </div>
  );
}

DropdownTrigger.propTypes = {
  isActive: PropTypes.bool.isRequired,
};