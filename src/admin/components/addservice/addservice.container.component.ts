import AddService from './addservice.component';
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {
  getCategories,
  getKeywords,
  getProviders,
} from '../../../map/selectors/map.selector';

const mapStateToProps = (state: State) => ({
  categories: getCategories(state.Map),
  providers: getProviders(state.Map),
  keywords: getKeywords(state.Map),
});

export default connect(mapStateToProps)(AddService);
