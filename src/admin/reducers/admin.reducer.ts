import update from 'immutability-helper';
import {
  AdminActionTypes,
  SETAVAILABLEIMAGES,
  SETCREDENTIALS,
} from '../actions/admin.actions';

export interface State {
  credentials?: string;
  availableImages: string[];
}

const initialState: State = {
  credentials: undefined,
  availableImages: [],
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

    case SETAVAILABLEIMAGES:
      return update(state, {
        availableImages: {$set: action.payload},
      });

    default:
      return state;
  }
};
