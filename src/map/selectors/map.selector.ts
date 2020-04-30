import {IState} from '../reducers/map.reducer';
import {DataFilter, DemoData, Providers} from '../../assets/data/dataType';
import {uniq} from "lodash";

export const getLoadingStatus = (state: IState): boolean => {
  return state.loading;
};

export const getFilteredContent = (state: IState): Array<DemoData> => {
  return Object.keys(state.filter).some(
    key => state.filter[key as keyof typeof state.filter].length > 0
  )
    ? state.filteredContent
    : state.content;
};

export const getContent = (state: IState): Array<DemoData> => {
  return state.content;
}

export const getFilter = (state: IState): DataFilter => {
  return state.filter;
};

export const getPossibleFilterValues = (state: IState): DataFilter => {
  return state.toFilterValues;
};

export const getDetailService = (state: IState): DemoData => {
  return state.detailedService;
};

export const getContentByProvider = (
  state: IState,
  provider: string
): Array<DemoData> => {
  return state.content.filter(service => service.provider === provider);
};

export const getProviders = (state: IState) => uniq(getContent(state).map(service => service.provider));
export const getCategories = (state: IState) => uniq(getContent(state).flatMap(service => service.category));
export const getServicesFunction = (state: IState) => (provider: Providers, category: string) =>
  getContent(state).filter(service => service.provider === provider && service.category.includes(category))
export const getIsFilteredFunction = (state: IState) => (service: DemoData) => !getFilteredContent(state).includes(service)