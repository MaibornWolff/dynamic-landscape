import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NavigationComponent from './navigation.component';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationComponent));
