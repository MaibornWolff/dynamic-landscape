import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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

import { Grid } from '@material-ui/core';
import { DemoData } from '../assets/data/dataType';
import DetailModal from './components/detailModal/detailModal.component';
import Loading from './components/laoding/loading.component';
import MapTable from './components/maptable/maptable.component';
import fetchAllServices from '../shared/mongodbConnection';

interface IProps {
  loading: boolean;
  detailService: DemoData;
  content: Array<DemoData>;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
}

class MapComponent extends React.Component<IProps> {

  componentDidMount() {
    fetchAllServices().then((data: DemoData[]) => this.props.setContent(data));
  }

  public render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ minHeight: 600, marginTop: 40 }}
      >
        {Object.keys(this.props.detailService).length !== 0 && (
          <DetailModal
            service={this.props.detailService}
            deleteDetailService={this.props.deleteDetailService}
          />
        )}
        {this.props.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path="/landscape">
              <p>asdfasdf</p>
            </Route>
            <Route path="/">
              <MapTable
                content={this.props.content}
                setDetailService={this.props.setDetailService}
              />
            </Route>
          </Switch>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  loading: getLoadingStatus(state.Map),
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
)(MapComponent);
