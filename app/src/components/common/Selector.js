import { FormGroup } from './FormGroup';
import PropTypes from 'prop-types';
import React from 'react';

export const Selector = ({ className, label, required, name, onChange, options, value, disabled }) => {
  const eventOnChange = (event) => {
    if (onChange) {
      onChange(name, event.target.value);
    }
  };
  return (<FormGroup className={className} name={name} label={label} required={required}>
    <select key={name} disabled={disabled} onChange={eventOnChange} className="form-control" name={name} value={value}>
      {options.map((item, index) => <option key={`for_${name}_v${item.value}_i${index}`} value={item.value}>{item.label}</option>)}
    </select>
  </FormGroup>);
};

Selector.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string
};
