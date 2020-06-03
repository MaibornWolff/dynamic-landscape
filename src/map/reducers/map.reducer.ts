import update from 'immutability-helper';
import {
  DELETESERVICE,
  MapActionTypes,
  SETCONTENT,
  SETDETAILSERVICE,
  SETFILTER,
  SETZOOMFACTOR,
} from '../actions/map.actions';
import {DataFilter, DemoData} from '../../assets/data/dataType';

export interface State {
  loading: boolean;
  content: Array<DemoData>;
  filter: DataFilter;
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

    case SETZOOMFACTOR:
      return update(state, {
        zoomFactor: {$set: action.payload},
      });

    case DELETESERVICE:
      return update(state, {
        content: {
          $set: state.content.filter(s => s._id !== action.payload._id),
        },
      });

    default:
      return state;
  }
};
