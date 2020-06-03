import React from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Login from './login/login.component';
import AddService from './addservice/addservice.container.component';
import Loading from '../../shared/components/laoding/loading.component';
import {Redirect, Route, Switch} from 'react-router';
import EditService from './editservice/editservice.container.component';
import {DemoData} from '../../assets/data/dataType';
import {Alert} from '@material-ui/lab';

export interface Props {
  credentials: string | undefined;
  setCredentials: (credentials: string) => void;
  loading: boolean;
  content: DemoData[];
}

const ContainerGrid = styled(Grid)({
  marginTop: 70,
});

export default function Admin(props: Props) {
  const findService = (serviceId: string) =>
    props.content.find(service => service._id === serviceId);

  const renderWrappedEditor = (credentials: string, serviceId: string) => {
    const service = findService(serviceId);
    if (service) {
      return <EditService credentials={credentials} service={service} />;
    } else {
      return <Alert severity="error">No service with that ID</Alert>;
    }
  };

  const closureCredentials = props.credentials;
  return (
    <ContainerGrid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      {closureCredentials ? (
        props.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path="/admin/add">
              <AddService credentials={closureCredentials} />
            </Route>
            <Route
              path="/admin/edit/:serviceId"
              render={routeProps =>
                renderWrappedEditor(
                  closureCredentials,
                  routeProps.match.params.serviceId
                )
              }
            />
            <Redirect to="/" />
          </Switch>
        )
      ) : (
        <Login setCredentials={props.setCredentials} />
      )}
    </ContainerGrid>
  );
}
