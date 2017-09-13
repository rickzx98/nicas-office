import * as alertActions from './NotificationActions';
import * as types from './';

import { LABEL_AN_ERROR_HAS_OCCURRED } from '../labels/';

export function beginAjaxCall() {
  return {
    type: types.BEGIN_AJAX_CALL
  };
}

export function ajaxCallError(error) {
  return dispatch => {
    dispatch(alertActions.alertDanger(error && error.message || LABEL_AN_ERROR_HAS_OCCURRED));
    return {
      type: types.AJAX_CALL_ERROR,
      error: error
    };
  };
}

export function ajaxCallSuccess() {
  return {
    type: types.AJAX_CALL_SUCESS
  };
}
