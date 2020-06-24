import * as React from 'react';
import {Redirect, match, matchPath} from 'react-router-dom';

import {Grid, styled, withWidth, isWidthUp} from '@material-ui/core';
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
import {History, Location} from 'history';
import {
  parse as parseQueryString,
  stringify as stringifyQueryString,
} from 'query-string';

import {ObjectID} from 'mongodb';

export interface Props {
  loading: boolean;
  filteredContent: DemoData[];
  contentSize: number;
  groupedContent: Map<Providers, Map<string, DemoData[]>>;
  providers: Providers[];
  categories: string[];
  filterBar: boolean;
  setContent: (object: DemoData[]) => void;
  zoomFactor: number;
  adminCredentials?: string;
  findServiceById: (id: ObjectID | string) => DemoData | undefined;
  location: Location;
  history: History;
  match: match;
}
interface State {
  filterBarOpen: boolean;
}

const StyledPaper = styled(Paper)({
  width: '100%',
  overflowX: 'auto',
});

class MapComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {filterBarOpen: false};
  }

  toggleFilterBar = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        filterBarOpen: !prevState.filterBarOpen,
      };
    });
  };

  setDetailService = (detailService: DemoData) =>
    this.props.history.replace({
      ...this.props.location,
      search: stringifyQueryString({serviceId: detailService._id}),
    });

  deleteDetailService = () =>
    this.props.history.replace({...this.props.location, search: undefined});

  findDetailService = () => {
    const serviceId = parseQueryString(this.props.location.search)
      .serviceId as string;
    return serviceId && this.props.findServiceById(serviceId);
  };

  public render() {
    const detailService = this.findDetailService();
    return (
      <>
        {' '}
        <FilterBarComponent
          open={this.state.filterBarOpen}
          toggleFilterBar={this.toggleFilterBar}
          showShowFilteredOnlySwitch={
            !!matchPath(this.props.location.pathname, '/landscape')
          }
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
          {detailService && (
            <DetailModal
              service={detailService}
              deleteDetailService={this.deleteDetailService}
              adminCredentials={this.props.adminCredentials}
              setContent={this.props.setContent}
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
                      <div style={{overflow: 'auto'}}>
                        <Landscape
                          filteredContent={this.props.filteredContent}
                          contentSize={this.props.contentSize}
                          groupedContent={this.props.groupedContent}
                          providers={this.props.providers}
                          categories={this.props.categories}
                          setDetailService={this.setDetailService}
                          zoomFactor={this.props.zoomFactor}
                        />
                      </div>
                    </CacheRoute>
                    <CacheRoute path="/table">
                      <MapTable
                        filteredContent={this.props.filteredContent}
                        contentSize={this.props.contentSize}
                        setDetailService={this.setDetailService}
                      />
                    </CacheRoute>
                    {isWidthUp('sm', this.props.width) ? (
                      <Redirect to="/landscape" />
                    ) : (
                      <Redirect to="/table" />
                    )}
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

export default withWidth()(MapComponent);
