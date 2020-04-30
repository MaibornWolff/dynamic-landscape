import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import WrappedLandscape from "./landscape.component";
import {setDetailService} from "../../actions/map.actions";
import {DemoData} from "../../../assets/data/dataType";
import {getCategories, getIsFilteredFunction, getProviders, getServicesFunction} from "../../selectors/map.selector";
import {IState} from "../../../reducers";

const mapStateToProps = (state: IState) => ({
  providers: getProviders(state.Map),
  categories: getCategories(state.Map),
  getServices: getServicesFunction(state.Map),
  isFiltered: getIsFilteredFunction(state.Map)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDetailService: (service: DemoData) => dispatch(setDetailService(service))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLandscape);