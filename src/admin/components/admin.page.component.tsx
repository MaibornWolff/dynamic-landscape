import React from 'react';
import {Grid} from '@material-ui/core';
import styled from 'styled-components';

export interface Props {
  credentials: string | undefined;
  setCredentials: (credentials: string) => void;
}

const ContainerGrid = styled(Grid)({
  marginTop: 70,
});

export default function Admin(props: Props) {
  const handleClick = () => props.setCredentials('logged in');

  return (
    <ContainerGrid
      container
      alignContent="center"
      justify="center"
      alignItems="center"
    >
      {props.credentials || 'Not logged in'}
      <button onClick={handleClick}>toggle</button>
    </ContainerGrid>
  );
}
