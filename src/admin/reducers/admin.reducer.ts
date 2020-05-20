import update from 'immutability-helper';
import {AdminActionTypes, SETCREDENTIALS} from '../actions/admin.actions';

export interface State {
  credentials?: string;
}

const initialState: State = {
  credentials: undefined,
};

export const Admin = (
  state: State = initialState,
  action: AdminActionTypes
) => {
  switch (action.type) {
    case SETCREDENTIALS:
      return update(state, {
        credentials: {$set: action.payload},
      });

    default:
      return state;
  }
};
