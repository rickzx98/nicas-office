import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';

import { FormGroup } from './FormGroup';
import { LABEL_ADD_NEW } from '../../labels/';
import PropTypes from 'prop-types';
import React from 'react';

export const SearchSelector = ({ options, label, name, labelKey, onChange, required, value,
  multiple, disabled, invalid, message, onSearch, allowNew = true }) => {
  const eventOnChange = (currentValue) => {
    if (onChange) {
      onChange(name, currentValue ?
        currentValue instanceof Array ?
          currentValue.map(cur => cur[labelKey || 'label'] || cur) : [] :
        currentValue);
    }
  };
  const typeaheadProps = {
    multiple,
    options,
    disabled,
    name,
    labelKey,
    allowNew,
    selected: value,
    onChange: eventOnChange,
    onSearch,
    placeholder: `${label}`,
    newSelectionPrefix: `${LABEL_ADD_NEW} ${label.toLowerCase()}: `
  };
  return (<FormGroup name={name} label={label} required={required}>
    <span>
      {!onSearch && <Typeahead  {...typeaheadProps} />}
      {onSearch && <AsyncTypeahead {...typeaheadProps} />}
      {invalid && <div className="col-sm-12 text-warning"><p>{message}</p></div>}
    </span>
  </FormGroup>);
};

SearchSelector.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelKey: PropTypes.string,
  options: PropTypes.array.isRequired,
  valueKey: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.array,
  multiple: PropTypes.bool,
  invalid: PropTypes.bool,
  message: PropTypes.string,
  onSearch: PropTypes.func,
  allowNew: PropTypes.bool
};
