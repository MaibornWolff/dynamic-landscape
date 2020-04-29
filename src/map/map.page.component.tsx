import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import {Grid, styled} from '@material-ui/core';
import {DemoData} from '../assets/data/dataType';
import DetailModal from './components/detailModal/detailModal.component';
import Loading from './components/laoding/loading.component';
import MapTable from './components/maptable/maptable.component';
import fetchAllServices from '../shared/mongodbConnection';
import Landscape from "./components/landscape/landscape.component";
import {FilterComponent} from '../shared/components/filter/filter.container.component';
import Paper from "@material-ui/core/Paper";

interface IProps {
  laoding: boolean;
  detailService: DemoData;
  content: Array<DemoData>;
  unfilteredContent: Array<DemoData>;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
}

const StyledPaper = styled(Paper)({
  width: '100%',
  overflowX: 'auto'
})

export default class MapComponant extends React.Component<IProps> {

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
        {Object.keys(this.props.detailService).length !== 0 && (
          <DetailModal
            service={this.props.detailService}
            deleteDetailService={this.props.deleteDetailService}
          />
        )}
        {this.props.laoding ? (
          <Loading/>
        ) : (
          <Grid item xs={11}>
            <FilterComponent displayChips={true}/>
            <StyledPaper>
              <Switch>
                <Route path="/landscape">
                  <Landscape
                    content={this.props.content}
                    unfilteredContent={this.props.unfilteredContent}
                    setDetailService={this.props.setDetailService}
                  />
                </Route>
                <Route path="/">
                  <MapTable
                    content={this.props.content}
                    setDetailService={this.props.setDetailService}
                  />
                </Route>
              </Switch>
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    );
  }
}
