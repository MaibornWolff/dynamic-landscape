import {connect} from 'react-redux';
import Zoom from './zoom.component';
import {State} from '../../../reducers';
import {getZoomFactor} from '../../../map/selectors/map.selector';
import {setZoomFactor} from '../../../map/actions/map.actions';

const mapStateToProps = (state: State) => ({
  zoomFactor: getZoomFactor(state.Map),
});

const mapDispatchToProps = () => ({
  setZoomFactor,
});

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
