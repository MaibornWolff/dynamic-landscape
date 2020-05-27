import * as React from 'react';
import {Redirect} from 'react-router-dom';

import {Grid, styled} from '@material-ui/core';
import {DemoData, Providers} from '../assets/data/dataType';
import DetailModal from './components/detailModal/detailModal.component';
import Loading from '../shared/components/laoding/loading.component';
import MapTable from './components/maptable/maptable.component';
import Landscape from './components/landscape/landscape.component';
import Paper from '@material-ui/core/Paper';
import Header from './components/header/header.container.component';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route';
import Footer from './components/footer/footer.component';
import {FilterBarComponent} from '../shared/components/filter/filter-bar/filter.container.component';

export interface Props {
  loading: boolean;
  detailService: DemoData | undefined;
  filteredContent: Array<DemoData>;
  groupedContent: Map<Providers, Map<string, DemoData[]>>;
  providers: Array<Providers>;
  categories: Array<string>;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteService: (service: DemoData) => void;
  deleteDetailService: () => void;
  zoomFactor: number;
  adminCredentials?: string;
}
interface State {
  filterBarOpen: boolean;
}

const StyledPaper = styled(Paper)({
  width: '100%',
  overflowX: 'auto',
});

export default class MapComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filterBarOpen: true};
  }

  toggleFilterBar = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        filterBarOpen: !prevState.filterBarOpen,
      };
    });
  };

  public render() {
    return (
      <>
        {' '}
        <FilterBarComponent
          open={this.state.filterBarOpen}
          toggleFilterBar={this.toggleFilterBar}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            minHeight: 600,
            paddingLeft: this.state.filterBarOpen ? '240px' : '0px',
            transition: 'padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          }}
        >
          {this.props.detailService && (
            <DetailModal
              service={this.props.detailService}
              deleteDetailService={this.props.deleteDetailService}
              adminCredentials={this.props.adminCredentials}
              deleteService={this.props.deleteService}
            />
          )}
          {this.props.loading ? (
            <Loading />
          ) : (
            <>
              <Grid item xs={11}>
                <Header toggleFilterBar={this.toggleFilterBar} />
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
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
}
