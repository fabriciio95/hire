import React from 'react';


  const Alert = (props) => {
    return (
      <div className={`alert ${props.error ? "" : "alert-success"}`}>
        {props.message}
      </div>
    );
  }

export default Alert;