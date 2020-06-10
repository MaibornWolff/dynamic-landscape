import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {State} from '../reducers';
import {
  getFilteredContent,
  getLoadingStatus,
  getZoomFactor,
  getContentSize,
  findServiceById,
  getGroupedShowableContent,
  getShowableProviders,
  getShowableCategories,
} from './selectors/map.selector';
import {setContent} from './actions/map.actions';
import MapComponent, {Props} from './map.page.component';

import {DemoData} from '../assets/data/dataType';
import {getCredentials} from '../admin/selectors/admin.selector';
import {withRouter} from 'react-router';

const mapStateToProps = (state: State) => ({
  loading: getLoadingStatus(state.Map),
  filteredContent: getFilteredContent(state.Map),
  contentSize: getContentSize(state.Map),
  groupedContent: getGroupedShowableContent(state.Map),
  providers: getShowableProviders(state.Map),
  categories: getShowableCategories(state.Map),
  zoomFactor: getZoomFactor(state.Map),
  adminCredentials: getCredentials(state.Admin),
  findServiceById: findServiceById(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContent: (content: DemoData[]) => dispatch(setContent(content)),
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<Props, typeof MapComponent>(MapComponent));
