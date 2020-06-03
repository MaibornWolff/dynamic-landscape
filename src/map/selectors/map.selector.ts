import {State} from '../reducers/map.reducer';
import {DataFilter, DemoData, Providers} from '../../assets/data/dataType';
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
export const getContentSize = createSelector(
  getContent,
  (content: DemoData[]): number => content.length
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

export const getZoomFactor = (state: State): number => state.zoomFactor;

/**
 * @param state current state that contains all services
 * @returns "nested" map that provides all services for a given provider and category
 */
export const getGroupedContent = createSelector(
  getContent,
  (content: DemoData[]) => {
    return content.reduce(
      (
        providersMap: Map<Providers, Map<string, DemoData[]>>,
        service: DemoData
      ) => {
        // get the map with all categories for the provider of service
        const categoriesMap =
          providersMap.get(service.provider) || new Map<string, DemoData[]>();
        // add the service to every category group it belongs to
        service.category.forEach(category => {
          const group = categoriesMap.get(category) || [];
          categoriesMap.set(category, [...group, service]);
        });
        return providersMap.set(service.provider, categoriesMap);
      },
      new Map()
    );
  }
);
