import * as React from 'react';
import ServiceEditor from '../../../shared/components/serviceeditor/serviceeditor.component';
import {DemoData} from '../../../assets/data/dataType';
import styled from 'styled-components';
import {Button, CircularProgress, Grid} from '@material-ui/core';
import fetchAllServices, {
  updateService,
} from '../../../shared/mongodbConnection';
import {useHistory} from 'react-router-dom';

export interface Props {
  categories: string[];
  providers: string[];
  keywords: string[];
  setContent: (services: DemoData[]) => void;
  credentials: string;
  service: DemoData;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

export default function EditService(props: Props) {
  const [service, setService] = React.useState<DemoData>(props.service);
  const [waiting, setWaiting] = React.useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = () => {
    setWaiting(true);
    updateService(props.credentials, service)
      .then(() => fetchAllServices(true))
      .then(services => props.setContent(services))
      .catch(err => console.error(err))
      .finally(() => {
        setWaiting(false);
        history.push('/');
      });
  };

  return (
    <Grid item xs={11} sm={10} md={9}>
      <Container>
        <ServiceEditor
          title="Edit service"
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
          {waiting ? <CircularProgress /> : 'Save changes'}
        </Button>
      </Container>
    </Grid>
  );
}
