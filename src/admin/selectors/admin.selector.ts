import {State} from '../reducers/admin.reducer';

export const getCredentials = (state: State): string | undefined =>
  state.credentials;
