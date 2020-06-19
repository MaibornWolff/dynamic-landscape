export const SETCREDENTIALS = 'SETCREDENTIALS';
export const SETAVAILABLEIMAGES = 'SETAVAILABLEIMAGES';

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

export interface SetAvailableImagesAction {
  type: typeof SETAVAILABLEIMAGES;
  payload: string[];
}

export function setAvailableImages(images: string[]): AdminActionTypes {
  return {
    type: SETAVAILABLEIMAGES,
    payload: images,
  };
}

export type AdminActionTypes = SetCredentialsAction | SetAvailableImagesAction;
