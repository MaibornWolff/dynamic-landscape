import * as React from 'react';
import ServiceEditor from './serviceeditor.component';
import {DemoData, DemoDataWithoutId} from '../../../assets/data/dataType';
import styled from 'styled-components';
import {Button, Grid} from '@material-ui/core';
import {addNewService} from '../../../shared/mongodbConnection';

export interface Props {
  categories: string[];
  providers: string[];
  keywords: string[];
  addService: (serice: DemoData) => void;
  credentials: string;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

const emptyService = {
  service: '',
  category: [],
  provider: '',
  description: '',
  img: '',
  keywords: [],
  providerIcon: '',
  webLink: '',
};

export default function AddService(props: Props) {
  const [service, setService] = React.useState<DemoDataWithoutId>(emptyService);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setWaiting(true);
    const sentService = service;
    addNewService(props.credentials, sentService)
      .then(result => ({
        ...sentService,
        _id: result.insertedId,
      }))
      .then(newService => props.addService(newService))
      .then(() => setService(emptyService))
      .catch(err => console.error(err))
      .finally(() => setWaiting(false));
  };

  return (
    <Grid item xs={11} sm={10} md={9}>
      <Container>
        <h2>Add a new service</h2>
        <ServiceEditor
          service={service}
          serviceChanged={setService}
          categories={props.categories}
          providers={props.providers}
          keywords={props.keywords}
          disabled={waiting}
        />
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: 15}}
          type="submit"
          onClick={handleSubmit}
          disabled={waiting}
        >
          Add service
        </Button>
      </Container>
    </Grid>
  );
}
