import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {
  getDetailService,
  getFilteredContent,
  getLoadingStatus,
  getGroupedContent,
  getCategories,
  getProviders,
  getZoomFactor,
} from './selectors/map.selector';
import {
  deleteDetailService,
  setContent,
  setDetailService,
} from './actions/map.actions';
import MapComponent from './map.page.component';

import {DemoData} from '../assets/data/dataType';
import {getCredentials} from '../admin/selectors/admin.selector';

const mapStateToProps = (state: State) => ({
  loading: getLoadingStatus(state.Map),
  filteredContent: getFilteredContent(state.Map),
  groupedContent: getGroupedContent(state.Map),
  detailService: getDetailService(state.Map),
  providers: getProviders(state.Map),
  categories: getCategories(state.Map),
  zoomFactor: getZoomFactor(state.Map),
  adminCredentials: getCredentials(state.Admin),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContent: (content: Array<DemoData>) => dispatch(setContent(content)),
  setDetailService: (service: DemoData) => dispatch(setDetailService(service)),
  deleteDetailService: () => dispatch(deleteDetailService()),
});

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
