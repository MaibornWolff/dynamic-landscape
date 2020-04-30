import { IAction } from '../../shared/action';
import update from 'immutability-helper';
import {
  SETCONTENT,
  SETDETAILSERVICE,
  SETFILTER
} from '../actions/map.actions';
import { DemoData, DataFilter } from '../../assets/data/dataType';
import { getToFilterValues, serviceFilter } from './filterLogic';

export interface IState {
  loading: boolean;
  content: Array<DemoData>;
  detailedService: DemoData;
  filteredContent: Array<DemoData>;
  filter: DataFilter; //TODO - define
  toFilterValues: DataFilter;
}

const initialState: IState = {
  loading: true,
  content: [],
  detailedService: {} as DemoData,
  filter: {
    provider: [],
    category: [],
    fulltext: ['Lambda']
  },
  toFilterValues: {
    provider: [],
    category: [],
    fulltext: []
  },
  filteredContent: []
};

export const Map = (state: IState = initialState, action: IAction<any>) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: { $set: action.payload },
        filteredContent: {
          $set: serviceFilter(action.payload, state.filter)
        },
        toFilterValues: {
          $set: getToFilterValues(action.payload)
        },
        loading: { $set: false }
      });

    case SETDETAILSERVICE:
      return update(state, {
        detailedService: { $set: action.payload }
      });

    case SETFILTER:
      return update(state, {
        filteredContent: {
          $set: serviceFilter(state.content, action.payload)
        },
        filter: { $set: action.payload }
      });

    default:
      return state;
  }
};
