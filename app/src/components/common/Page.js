import PropTypes from 'prop-types';
import React from 'react';
export const Page = ({ children, className }) => {
  const clazz = 'page ' + (className || '');
  return (<div className={clazz}>
    {children}
  </div>);
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};
