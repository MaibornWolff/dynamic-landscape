import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import FilterComponentContainer from './filter.component';
import {
  setFilter,
  setShowFilteredOnly,
} from '../../../../map/actions/map.actions';
import {
  getFilter,
  getPossibleFilterValues,
  getShowFilteredOnly,
} from '../../../../map/selectors/map.selector';
import {State} from '../../../../reducers';
import {DataFilter} from '../../../../assets/data/dataType';

const mapStateToProps = (state: State) => ({
  filter: getFilter(state.Map),
  possibleFilterValues: getPossibleFilterValues(state.Map),
  showFilteredOnly: getShowFilteredOnly(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: DataFilter) => dispatch(setFilter(filter)),
  setShowFilteredOnly: (showFilteredOnly: boolean) =>
    dispatch(setShowFilteredOnly(showFilteredOnly)),
});

export const FilterBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponentContainer);
