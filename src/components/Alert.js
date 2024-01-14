import React from "react";

const Alert = (props) => {
  return (
    <div>
      <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.mess}
        {/* heelo */}
      </div>
    </div>
  );
};

export default Alert;
