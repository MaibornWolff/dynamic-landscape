import * as React from 'react';
import ServiceEditor from './serviceeditor.component';
import {DemoData} from '../../../assets/data/dataType';
import styled from 'styled-components';
import {Button, Grid} from '@material-ui/core';

export interface Props {
  categories: string[];
  providers: string[];
  keywords: string[];
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

export default function AddService(props: Props) {
  const [service, setService] = React.useState<DemoData>({
    service: '',
    category: [],
    provider: '',
    description: '',
    img: '',
    keywords: [],
    providerIcon: '',
    webLink: '',
  });

  const handleSubmit = () => alert('Submit!');

  return (
    <Grid item xs={11} sm={10} md={9}>
      <Container>
        <ServiceEditor
          service={service}
          serviceChanged={setService}
          categories={props.categories}
          providers={props.providers}
          keywords={props.keywords}
        />
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: 15}}
          type="submit"
          onClick={handleSubmit}
        >
          Add service
        </Button>
      </Container>
    </Grid>
  );
}
