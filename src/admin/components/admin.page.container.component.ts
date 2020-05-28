import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State} from '../../reducers';
import {getCredentials} from '../selectors/admin.selector';
import {setCredentials} from '../actions/admin.actions';
import AdminWrapped from './admin.page.component';

const mapStateToProps = (state: State) => ({
  credentials: getCredentials(state.Admin),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCredentials: (credentials: string) =>
    dispatch(setCredentials(credentials)),
});

export const Admin = connect(mapStateToProps, mapDispatchToProps)(AdminWrapped);
