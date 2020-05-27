import AddService from './addservice.component';
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {getCategories} from '../../../map/selectors/map.selector';

const mapStateToProps = (state: State) => ({
  categories: getCategories(state.Map),
});

export default connect(mapStateToProps)(AddService);
