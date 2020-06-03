import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import NavigationComponent from './navigation.component';

import {getCredentials} from '../../../admin/selectors/admin.selector';
import {State} from '../../../reducers';

const mapStateToProps = (state: State) => ({
  adminCredentials: getCredentials(state.Admin),
});

const mapDispatchToProps = () => ({});

export const Navigation = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationComponent)
);
