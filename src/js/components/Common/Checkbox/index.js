import React from 'react';
import classnames from 'classnames';
import "./style.less";

const CheckboxComponent = ({ text, className, validation, children, ...props }) => {
  return (
    <label className={classnames('checkbox', className, validation )}>
      {children}
      {text}
      <input type="checkbox" {...props} />
      <span className="checkmark"></span>
    </label>
  )
}

export default CheckboxComponent;
