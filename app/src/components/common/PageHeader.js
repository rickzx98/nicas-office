import FontAwesome from 'react-fontawesome';
import { LoadingBalls } from './';
import PropTypes from 'prop-types';
import React from 'react';

export const PageHeader = ({ label, iconName, loading = false, spinIcon = true }) => {
  return (<div className="page-header animated fadeIn">
    <div className="page-background-fader" />
    <h3 className="page-header-title">
      {loading && !spinIcon && <LoadingBalls />}
      {((loading && spinIcon) ||
        (!loading && spinIcon) ||
        (!loading && !spinIcon)) &&
        <FontAwesome className={loading ? 'loading-icon' : ''}
          name={iconName} size="lg" fixedWidth={true} spin={loading} />}
      <p> {label} </p>
    </h3>
  </div>);
};

PageHeader.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  spinIcon: PropTypes.bool
};
