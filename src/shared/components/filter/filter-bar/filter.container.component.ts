import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import FilterComponentContainer from './filter.component';
import {setFilter} from '../../../../map/actions/map.actions';
import {
  getFilter,
  getPossibleFilterValues,
} from '../../../../map/selectors/map.selector';
import {State} from '../../../../reducers';
import {DataFilter} from '../../../../assets/data/dataType';

const mapStateToProps = (state: State) => ({
  filter: getFilter(state.Map),
  possibleFilterValues: getPossibleFilterValues(state.Map),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: DataFilter) => dispatch(setFilter(filter)),
});

export const FilterBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponentContainer);
