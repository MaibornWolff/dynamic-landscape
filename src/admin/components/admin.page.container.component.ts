import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State} from '../../reducers';
import {getCredentials} from '../selectors/admin.selector';
import {setAvailableImages, setCredentials} from '../actions/admin.actions';
import AdminWrapped from './admin.page.component';
import {
  findServiceById,
  getLoadingStatus,
} from '../../map/selectors/map.selector';

const mapStateToProps = (state: State) => ({
  credentials: getCredentials(state.Admin),
  loading: getLoadingStatus(state.Map),
  findServiceById: findServiceById(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCredentials: (credentials: string) =>
    dispatch(setCredentials(credentials)),
  setAvailableImages: (availableImages: string[]) =>
    dispatch(setAvailableImages(availableImages)),
});

export const Admin = connect(mapStateToProps, mapDispatchToProps)(AdminWrapped);
