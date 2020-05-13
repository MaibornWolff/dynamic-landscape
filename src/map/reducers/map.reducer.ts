import update from 'immutability-helper';
import {
  MapActionTypes,
  SETCONTENT,
  SETDETAILSERVICE,
  SETFILTER,
} from '../actions/map.actions';
import {DataFilter, DemoData} from '../../assets/data/dataType';

export interface State {
  loading: boolean;
  content: Array<DemoData>;
  filter: DataFilter;
  detailedService?: DemoData;
}

const initialState: State = {
  loading: true,
  content: [],
  filter: {
    provider: [],
    category: [],
    fulltext: [],
  },
  detailedService: undefined,
};

export const Map = (state: State = initialState, action: MapActionTypes) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: {$set: action.payload},
        loading: {$set: false},
      });

    case SETDETAILSERVICE:
      return update(state, {
        detailedService: {$set: action.payload},
      });

    case SETFILTER:
      return update(state, {
        filter: {$set: action.payload},
      });

    default:
      return state;
  }
};
