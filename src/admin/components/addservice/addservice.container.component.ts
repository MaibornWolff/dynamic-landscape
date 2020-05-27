import AddService from './addservice.component';
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {
  getCategories,
  getKeywords,
  getProviders,
} from '../../../map/selectors/map.selector';
import {Dispatch} from 'redux';
import {DemoData} from '../../../assets/data/dataType';
import {addService} from '../../../map/actions/map.actions';

const mapStateToProps = (state: State) => ({
  categories: getCategories(state.Map),
  providers: getProviders(state.Map),
  keywords: getKeywords(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addService: (service: DemoData) => dispatch(addService(service)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddService);
