export const SETCREDENTIALS = 'SETCREDENTIALS';

export interface SetCredentialsAction {
  type: typeof SETCREDENTIALS;
  payload: string;
}

export function setCredentials(credentials: string): AdminActionTypes {
  return {
    type: SETCREDENTIALS,
    payload: credentials,
  };
}

export type AdminActionTypes = SetCredentialsAction;
