import {DemoData, DataFilter} from '../../assets/data/dataType';

export const SETCONTENT = 'SETCONTENT';
export const SETFILTER = 'SETFILTER';
export const SETZOOMFACTOR = 'SETZOOMFACTOR';
export const SHOWFILTEREDONLY = 'SHOWFILTEREDONLY';

export interface SetContentAction {
  type: typeof SETCONTENT;
  payload: DemoData[];
}

export function setContent(value: DemoData[]): MapActionTypes {
  return {
    type: SETCONTENT,
    payload: value,
  };
}

export interface SetFilterAction {
  type: typeof SETFILTER;
  payload: DataFilter;
}

export function setFilter(filter: DataFilter): MapActionTypes {
  return {
    type: SETFILTER,
    payload: filter,
  };
}

export interface ShowFilteredOnlyAction {
  type: typeof SHOWFILTEREDONLY;
  payload: boolean;
}

export function setShowFilteredOnly(
  showFilteredOnly: boolean
): ShowFilteredOnlyAction {
  return {
    type: SHOWFILTEREDONLY,
    payload: showFilteredOnly,
  };
}

export interface SetZoomFactorAction {
  type: typeof SETZOOMFACTOR;
  payload: number;
}

export function setZoomFactor(zoomFactor: number): MapActionTypes {
  return {
    type: SETZOOMFACTOR,
    payload: zoomFactor,
  };
}

export type MapActionTypes =
  | SetContentAction
  | SetFilterAction
  | ShowFilteredOnlyAction
  | SetZoomFactorAction;
