import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers';
import {
  getLoadingStatus,
  getDetailService,
  getContent
} from './selectors/map.selector';
import {
  setContent,
  setDetailService,
  deleteDetailService
} from './actions/map.actions';
import MapComponant from './map.page.component';

import { DemoData } from '../assets/data/dataType';


const mapStateToProps = (state: IState) => ({
    laoding: getLoadingStatus(state.Map),
    content: getContent(state.Map),
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
  )(MapComponant);
  