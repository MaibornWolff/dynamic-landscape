import {DemoData, DataFilter} from '../../assets/data/dataType';

export const SETCONTENT = 'SETCONTENT';
export const SETDETAILSERVICE = 'SETDETAILSERVICE';
export const SETFILTER = 'SETFILTER';
export const SETZOOMFACTOR = 'SETZOOMFACTOR';

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

export interface SetDetailService {
  type: typeof SETDETAILSERVICE;
  payload: DemoData | undefined;
}

export function setDetailService(value: DemoData): MapActionTypes {
  return {
    type: SETDETAILSERVICE,
    payload: value,
  };
}

export function deleteDetailService(): MapActionTypes {
  return {
    type: SETDETAILSERVICE,
    payload: undefined,
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
  | SetDetailService
  | SetFilterAction
  | SetZoomFactorAction;
