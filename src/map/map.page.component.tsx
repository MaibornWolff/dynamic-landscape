import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { DemoData } from '../assets/data/dataType';
import DetailModal from './components/detailModal/detailModal.component';
import Loading from './components/laoding/loading.component';
import MapTable from './components/maptable/maptable.component';
import fetchAllServices from '../shared/mongodbConnection';

interface IProps {
  laoding: boolean;
  detailService: DemoData;
  content: Array<DemoData>;
  setContent: (object: Array<DemoData>) => void;
  setDetailService: (object: DemoData) => void;
  deleteDetailService: () => void;
}

export default class MapComponant extends React.Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  //   // Don't call this.setState() here!
  // }

  private fetchData() {
    // if (this.props.laoding) {
    //   fetchAllServices().then((data: DemoData[]) => {
    //     sessionStorage.serviceContent = JSON.stringify(data);
    //     this.props.setContent(data);
    //   });
    // }
    try {
      this.props.setContent(JSON.parse(sessionStorage.serviceContent));
    } catch (error) {
      console.log('erroasdfasdfafsr');
    }
  }

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
        {this.props.laoding ? (
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
