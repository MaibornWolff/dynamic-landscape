import {State} from '../reducers/map.reducer';
import {
  DataFilter,
  DemoData,
  Providers,
  ServiceFeatures,
} from '../../assets/data/dataType';

export const getLoadingStatus = (state: State): boolean => {
  return state.loading;
};

export const getFilteredContent = (state: State): Array<DemoData> => {
  return Object.keys(state.filter).some(
    key => state.filter[key as keyof typeof state.filter].length > 0
  )
    ? state.filteredContent
    : state.content;
};

export const getContent = (state: State): Array<DemoData> => state.content;

export const getFilter = (state: State): DataFilter => state.filter;

export const getPossibleFilterValues = (state: State): ServiceFeatures =>
  state.toFilterValues;

export const getProviders = (state: State): Array<Providers> =>
  state.toFilterValues.provider;

export const getCategories = (state: State): Array<string> =>
  state.toFilterValues.category;

export const getDetailService = (state: State): DemoData =>
  state.detailedService;
