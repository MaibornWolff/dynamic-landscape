import update from 'immutability-helper';
import {
  MapActionTypes,
  SETCONTENT,
  SETFILTER,
  SETZOOMFACTOR,
  SHOWFILTEREDONLY,
} from '../actions/map.actions';
import {DataFilter, DemoData} from '../../assets/data/dataType';

export interface State {
  loading: boolean;
  content: DemoData[];
  filter: DataFilter;
  showFilteredOnly: boolean;
  zoomFactor: number;
}

const initialState: State = {
  loading: true,
  content: [],
  filter: {
    provider: [],
    category: [],
    fulltext: [],
    keywords: [],
  },
  showFilteredOnly: false,
  zoomFactor: 1,
};

export const Map = (state: State = initialState, action: MapActionTypes) => {
  switch (action.type) {
    case SETCONTENT:
      return update(state, {
        content: {$set: action.payload},
        loading: {$set: false},
      });

    case SETFILTER:
      return update(state, {
        filter: {$set: action.payload},
      });

    case SHOWFILTEREDONLY:
      return update(state, {
        showFilteredOnly: {$set: action.payload},
      });

    case SETZOOMFACTOR:
      return update(state, {
        zoomFactor: {$set: action.payload},
      });

    default:
      return state;
  }
};
