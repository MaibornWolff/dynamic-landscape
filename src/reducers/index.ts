import {combineReducers} from 'redux';
import {Map, State as MapState} from '../map/reducers/map.reducer';
import {Admin, State as AdminState} from '../admin/reducers/admin.reducer';

//to put router state in redux state
//import { RouterState } from 'connected-react-router';

export const rootReducer = combineReducers({
  Map,
  Admin,
});

// this is the global state
export interface State {
  Map: MapState;
  Admin: AdminState;
}
