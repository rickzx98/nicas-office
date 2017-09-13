import { LABEL_NO_WAIT, LABEL_YES_PLEASE } from '../../labels/';

import PropTypes from 'prop-types';
import React from 'react';

export const CancelModalFooter = ({ confirmCancel, closeDialog, resolve, reject }) => {
  const confirm = () => {
    if (resolve) {
      resolve(confirmCancel());
    } else {
      confirmCancel();
    }
  };
  const cancel = () => {
    if (reject) {
      reject(closeDialog());
    } else {
      closeDialog();
    }
  };
  return (<div className="btn-group btn-group-sm">
    <button onClick={confirm} className="btn btn-primary">{LABEL_YES_PLEASE}</button>
    <button onClick={cancel} className="btn btn-danger">{LABEL_NO_WAIT}</button>
  </div>);
};

CancelModalFooter.propTypes = {
  confirmCancel: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  resolve: PropTypes.func,
  reject: PropTypes.func
};
