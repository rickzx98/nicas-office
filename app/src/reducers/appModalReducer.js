import { CLOSE_DIALOG, OPEN_DIALOG } from '../actions/';

import initialState from './initialState';

export default function appModalReducer(state = initialState.dialog, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return action.dialog;
    case CLOSE_DIALOG:
      return initialState.dialog;
    default:
      return state;
  }
}
