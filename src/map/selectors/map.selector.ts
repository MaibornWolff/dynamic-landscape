import {State} from '../reducers/map.reducer';
import {DataFilter, DemoData} from '../../assets/data/dataType';
import {getToFilterValues, serviceFilter} from '../reducers/filterLogic';
import {createSelector} from 'reselect';

export const getLoadingStatus = (state: State): boolean => {
  return state.loading;
};

export const getContent = (state: State): Array<DemoData> => state.content;

export const getFilter = (state: State): DataFilter => state.filter;

export const getFilteredContent = createSelector(
  getFilter,
  getContent,
  (filter, content) => serviceFilter(content, filter)
);

export const getPossibleFilterValues = createSelector(getContent, content =>
  getToFilterValues(content)
);

export const getProviders = createSelector(
  getPossibleFilterValues,
  toFilterValues => toFilterValues.provider
);

export const getCategories = createSelector(
  getPossibleFilterValues,
  toFilterValues => toFilterValues.category
);

export const getDetailService = (state: State): DemoData | undefined =>
  state.detailedService;
