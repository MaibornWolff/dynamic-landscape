import React from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';
import Login from './login/login.component';

export interface Props {
  credentials: string | undefined;
  setCredentials: (credentials: string) => void;
}

const ContainerGrid = styled(Grid)({
  marginTop: 70,
});

export default function Admin(props: Props) {
  return (
    <ContainerGrid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      {props.credentials ? (
        <>You are logged in!</>
      ) : (
        <Login setCredentials={props.setCredentials} />
      )}
    </ContainerGrid>
  );
}
