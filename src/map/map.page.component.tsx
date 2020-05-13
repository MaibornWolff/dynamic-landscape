import * as React from 'react';
import {Redirect} from 'react-router-dom';

import {Grid, styled} from '@material-ui/core';
import {DemoData, Providers} from '../assets/data/dataType';
import DetailModal from './components/detailModal/detailModal.component';
import Loading from './components/laoding/loading.component';
import MapTable from './components/maptable/maptable.component';
import fetchAllServices from '../shared/mongodbConnection';
import Landscape from './components/landscape/landscape.component';
import Paper from '@material-ui/core/Paper';
import Header from './components/header/header.component';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route';

export interface Props {
  loading: boolean;
  detailService: DemoData | undefined;
  filteredContent: Array<DemoData>;
  groupedContent: Map<Providers, Map<string, DemoData[]>>;
  providers: Array<Providers>;
  categories: Array<string>;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
  zoomFactor: number;
}

const StyledPaper = styled(Paper)({
  width: '100%',
  overflowX: 'auto',
});

export default class MapComponent extends React.Component<Props> {
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
        style={{minHeight: 600, marginTop: 40}}
      >
        {this.props.detailService && (
          <DetailModal
            service={this.props.detailService}
            deleteDetailService={this.props.deleteDetailService}
          />
        )}
        {this.props.loading ? (
          <Loading />
        ) : (
          <Grid item xs={11}>
            <Header />
            <StyledPaper>
              <CacheSwitch>
                <CacheRoute path="/landscape">
                  <Landscape
                    filteredContent={this.props.filteredContent}
                    groupedContent={this.props.groupedContent}
                    providers={this.props.providers}
                    categories={this.props.categories}
                    setDetailService={this.props.setDetailService}
                    zoomFactor={this.props.zoomFactor}
                  />
                </CacheRoute>
                <CacheRoute path="/table">
                  <MapTable
                    content={this.props.filteredContent}
                    setDetailService={this.props.setDetailService}
                  />
                </CacheRoute>
                <Redirect to="/landscape" />
              </CacheSwitch>
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    );
  }
}
