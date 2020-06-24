import EditService from './editservice.component';
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {
  getCategories,
  getKeywords,
  getProviders,
} from '../../../map/selectors/map.selector';
import {Dispatch} from 'redux';
import {Service} from '../../../assets/data/dataType';
import {setContent} from '../../../map/actions/map.actions';
import {setAvailableImages} from '../../actions/admin.actions';
import {getAvailableImages} from '../../selectors/admin.selector';

const mapStateToProps = (state: State) => ({
  categories: getCategories(state.Map),
  providers: getProviders(state.Map),
  keywords: getKeywords(state.Map),
  availableImages: getAvailableImages(state.Admin),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContent: (services: Service[]) => dispatch(setContent(services)),
  setAvailableImages: (availableImages: string[]) =>
    dispatch(setAvailableImages(availableImages)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditService);
