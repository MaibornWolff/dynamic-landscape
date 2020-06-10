import update from 'immutability-helper';
import {
  MapActionTypes,
  SETCONTENT,
  SETDETAILSERVICE,
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
  detailedService?: DemoData;
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
  detailedService: undefined,
  zoomFactor: 1,
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
