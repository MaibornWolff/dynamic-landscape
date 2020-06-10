import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {
  getDetailService,
  getFilteredContent,
  getLoadingStatus,
  getZoomFactor,
  getContentSize,
  getGroupedShowableContent,
  getShowableProviders,
  getShowableCategories,
} from './selectors/map.selector';
import {
  deleteDetailService,
  setContent,
  setDetailService,
} from './actions/map.actions';
import MapComponent, {Props} from './map.page.component';

import {DemoData} from '../assets/data/dataType';
import {getCredentials} from '../admin/selectors/admin.selector';
import {withRouter} from 'react-router';

const mapStateToProps = (state: State) => ({
  loading: getLoadingStatus(state.Map),
  filteredContent: getFilteredContent(state.Map),
  contentSize: getContentSize(state.Map),
  groupedContent: getGroupedShowableContent(state.Map),
  detailService: getDetailService(state.Map),
  providers: getShowableProviders(state.Map),
  categories: getShowableCategories(state.Map),
  zoomFactor: getZoomFactor(state.Map),
  adminCredentials: getCredentials(state.Admin),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContent: (content: DemoData[]) => dispatch(setContent(content)),
  setDetailService: (service: DemoData) => dispatch(setDetailService(service)),
  deleteDetailService: () => dispatch(deleteDetailService()),
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<Props, typeof MapComponent>(MapComponent));
