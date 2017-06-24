import React from 'react';
import PropTypes from 'prop-types';

export default function Confirm({ onCancel, onDangerClick, onDangerText, title }) {

  return(
    <div className="confirm-modal">
      {title}
      <p className="danger-text">{onDangerText}</p>
      <button className="cancel" onClick={onCancel}>Cancel</button>
      <button className="confirm" onClick={onDangerClick}>Confirm</button>
    </div>
  );
}

Confirm.propTypes = {
}