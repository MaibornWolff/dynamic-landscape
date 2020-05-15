import {connect} from 'react-redux';
import Zoom from './zoom.component';
import {State} from '../../../reducers';
import {getZoomFactor} from '../../../map/selectors/map.selector';
import {setZoomFactor} from '../../../map/actions/map.actions';
import {Dispatch} from 'redux';

const mapStateToProps = (state: State) => ({
  zoomFactor: getZoomFactor(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setZoomFactor: (zoomFactor: number) => dispatch(setZoomFactor(zoomFactor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
