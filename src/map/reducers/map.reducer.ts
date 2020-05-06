import {Action} from '../../shared/action';
import update from 'immutability-helper';
import {SETCONTENT, SETDETAILSERVICE, SETFILTER} from '../actions/map.actions';
import {DataFilter, DemoData} from '../../assets/data/dataType';
import {getToFilterValues, serviceFilter} from './filterLogic';

export interface State {
  loading: boolean;
  content: Array<DemoData>;
  detailedService: DemoData;
  filteredContent: Array<DemoData>;
  filter: DataFilter; //TODO - define
  toFilterValues: DataFilter;
}

const initialState: State = {
  loading: true,
  content: [],
  filteredContent: [],
  detailedService: {} as DemoData,
  filter: {
    provider: [],
    category: [],
    fulltext: [],
  },
  toFilterValues: {
    provider: [],
    category: [],
    fulltext: [],
  },
};

export const Map = (state: State = initialState, action: Action<any>) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: {$set: action.payload},
        filteredContent: {
          $set: serviceFilter(action.payload, state.filter),
        },
        toFilterValues: {
          $set: getToFilterValues(action.payload),
        },
        loading: {$set: false},
      });

    case SETDETAILSERVICE:
      return update(state, {
        detailedService: {$set: action.payload},
      });

    case SETFILTER:
      return update(state, {
        filteredContent: {
          $set: serviceFilter(state.content, action.payload),
        },
        filter: {$set: action.payload},
      });

    default:
      return state;
  }
};
