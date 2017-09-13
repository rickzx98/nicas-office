import PropTypes from 'prop-types';
import React from 'react';

export const FormGroup = ({ label, required, name, children, message, invalid }) => {
  let inputClass = 'clearfix form-group';
  return (
    <div className={!invalid ? inputClass : inputClass + ' has-error'}>
      <label className="control-label" htmlFor={name + '_form'}>
        {required && <span className="text-warning">*</span>} {label}</label>
      <div id={name + '_form'} className="col-sm-12">{children}</div>
      {invalid && <div className="col-sm-12 text-warning"><p>{message}</p></div>}
    </div>);
};

FormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.element.isRequired,
  required: PropTypes.bool,
  message: PropTypes.string,
  invalid: PropTypes.bool
};
