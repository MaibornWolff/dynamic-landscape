import { IState } from '../reducers/map.reducer';
import { DataFilter, DemoData, Providers } from '../../assets/data/dataType';

export const getLoadingStatus = (state: IState): boolean => {
  return state.loading;
};

export const getFilteredContent = (state: IState): Array<DemoData> => {
  return Object.keys(state.filter).some(
    (key) => state.filter[key as keyof typeof state.filter].length > 0
  )
    ? state.filteredContent
    : state.content;
};

export const getContent = (state: IState): Array<DemoData> => state.content;

export const getFilter = (state: IState): DataFilter => state.filter;

export const getPossibleFilterValues = (state: IState): DataFilter =>
  state.toFilterValues;

export const getProviders = (state: IState): Array<Providers> =>
  state.toFilterValues.provider;

export const getCategories = (state: IState): Array<string> =>
  state.toFilterValues.category;

export const getDetailService = (state: IState): DemoData =>
  state.detailedService;
