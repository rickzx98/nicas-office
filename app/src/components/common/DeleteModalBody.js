import { LABEL_CONFIRM_DO_YOU_WANT_TO_DELETE } from '../../labels/';
import PropTypes from 'prop-types';
import React from 'react';

export const DeleteModalBody = ({itemName}) => {
  return <p>{LABEL_CONFIRM_DO_YOU_WANT_TO_DELETE + ` ${itemName}?`}</p>;
};

DeleteModalBody.propTypes = {
  itemName: PropTypes.string.isRequired
};
