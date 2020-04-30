import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IState} from '../reducers';
import {getDetailService, getFilteredContent, getLoadingStatus} from './selectors/map.selector';
import {deleteDetailService, setContent, setDetailService} from './actions/map.actions';
import MapComponent from './map.page.component';

import {DemoData} from '../assets/data/dataType';


const mapStateToProps = (state: IState) => ({
  loading: getLoadingStatus(state.Map),
  filteredContent: getFilteredContent(state.Map),
  detailService: getDetailService(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContent: (content: Array<DemoData>) => dispatch(setContent(content)),
  setDetailService: (service: DemoData) => dispatch(setDetailService(service)),
  deleteDetailService: () => dispatch(deleteDetailService())
});

export const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent);