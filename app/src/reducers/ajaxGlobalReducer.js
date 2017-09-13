import { AJAX_CALL_ERROR, AJAX_CALL_SUCESS, BEGIN_AJAX_CALL } from '../actions/';

import initialState from './initialState';

export default function ajaxGlobalReducer(state = initialState.ajaxGlobal, action) {
  switch (action.type) {
    case BEGIN_AJAX_CALL:
      {
        return Object.assign({}, { ...initialState.ajaxGlobal, started: true });
      }
    case AJAX_CALL_ERROR:
    case AJAX_CALL_SUCESS:
      {
        return Object.assign({}, { ...state, started: false, done: true });
      }
    default:
      return state;
  }
}
