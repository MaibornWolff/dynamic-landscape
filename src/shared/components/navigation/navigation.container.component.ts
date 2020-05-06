import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import NavigationComponent from './navigation.component';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationComponent));
