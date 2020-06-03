import React from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Login from './login/login.component';
import AddService from './addservice/addservice.container.component';
import Loading from '../../shared/components/laoding/loading.component';
import {Redirect, Route, Switch} from 'react-router';

export interface Props {
  credentials: string | undefined;
  setCredentials: (credentials: string) => void;
  loading: boolean;
}

const ContainerGrid = styled(Grid)({
  marginTop: 70,
});

export default function Admin(props: Props) {
  console.log();
  return (
    <ContainerGrid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      {props.credentials ? (
        props.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route path="/admin/add">
              <AddService credentials={props.credentials} />
            </Route>
            <Redirect to="/" />
          </Switch>
        )
      ) : (
        <Login setCredentials={props.setCredentials} />
      )}
    </ContainerGrid>
  );
}
