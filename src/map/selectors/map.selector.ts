import {State} from '../reducers/map.reducer';
import {ObjectID} from 'mongodb';
import {DataFilter, Service, Providers} from '../../assets/data/dataType';
import {getToFilterValues, serviceFilter} from '../reducers/filterLogic';
import {createSelector, Selector} from 'reselect';

export const getLoadingStatus = (state: State): boolean => {
  return state.loading;
};

export const getContent = (state: State): Service[] => state.content;

export const getFilter = (state: State): DataFilter => state.filter;

export const getFilteredContent = createSelector(
  getFilter,
  getContent,
  (filter, content) => serviceFilter(content, filter)
);

export const getShowFilteredOnly = (state: State): boolean =>
  state.showFilteredOnly;

export const getContentSize = createSelector(
  getContent,
  (content: Service[]): number => content.length
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

export const getKeywords = createSelector(
  getPossibleFilterValues,
  toFilterValues => toFilterValues.keywords
);

export const getFilteredPossibleFilterValues = createSelector(
  getFilteredContent,
  filteredContent => getToFilterValues(filteredContent)
);

export const getFilteredProviders = createSelector(
  getFilteredPossibleFilterValues,
  toFilterValues => toFilterValues.provider
);

export const getFilteredCategories = createSelector(
  getFilteredPossibleFilterValues,
  toFilterValues => toFilterValues.category
);

const createShowableSwitchingSelector = <R>(
  selectorAll: Selector<State, R>,
  selectorFiltered: Selector<State, R>
) =>
  createSelector<State, boolean, R, R, R>(
    getShowFilteredOnly,
    selectorAll,
    selectorFiltered,
    (showFilteredOnly, all, filtered) => (showFilteredOnly ? filtered : all)
  );

export const getShowableProviders = createShowableSwitchingSelector(
  getProviders,
  getFilteredProviders
);

export const getShowableCategories = createShowableSwitchingSelector(
  getCategories,
  getFilteredCategories
);

export const findServiceById = createSelector(
  getContent,
  content => (id: ObjectID | string) =>
    content.find(service => service._id.toString() === id.toString())
);

export const getZoomFactor = (state: State): number => state.zoomFactor;

const groupContent = (content: Service[]) => {
  return content.reduce(
    (
      providersMap: Map<Providers, Map<string, Service[]>>,
      service: Service
    ) => {
      // get the map with all categories for the provider of service
      const categoriesMap =
        providersMap.get(service.provider) || new Map<string, Service[]>();
      // add the service to every category group it belongs to
      service.category.forEach(category => {
        const group = categoriesMap.get(category) || [];
        categoriesMap.set(category, [...group, service]);
      });
      return providersMap.set(service.provider, categoriesMap);
    },
    new Map()
  );
};

/**
 * @param state current state that contains all services
 * @returns "nested" map that provides all services for a given provider and category
 */
export const getGroupedContent = createSelector(getContent, groupContent);
export const getGroupedFilteredContent = createSelector(
  getFilteredContent,
  groupContent
);
export const getGroupedShowableContent = createShowableSwitchingSelector(
  getGroupedContent,
  getGroupedFilteredContent
);
