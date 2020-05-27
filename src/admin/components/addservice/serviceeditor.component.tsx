import React from 'react';
import {DemoData} from '../../../assets/data/dataType';
import {Grid, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

export interface Props {
  service: DemoData;
  serviceChanged: (service: DemoData) => void;
  categories: string[];
  providers: string[];
  keywords: string[];
}

export default function ServiceEditor(props: Props) {
  const handleServiceChange = (changedAttributes: Partial<DemoData>) =>
    props.serviceChanged({
      ...props.service,
      ...changedAttributes,
    });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleServiceChange({
      service: event.target.value,
    });

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    handleServiceChange({
      description: event.target.value,
    });

  const handleCategoriesChange = (
    event: React.ChangeEvent<{}>,
    value: string[] | null
  ) => handleServiceChange({category: value || []});

  const handleProviderChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => handleServiceChange({provider: value || ''});

  const handleKeywordsChange = (
    event: React.ChangeEvent<{}>,
    value: string[] | null
  ) => handleServiceChange({keywords: value || []});

  return (
    <Grid container direction="column" alignContent="stretch">
      <Grid item xs={12}>
        <TextField
          label="Name"
          value={props.service.service}
          onChange={handleNameChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          multiline
          value={props.service.description}
          onChange={handleDescriptionChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          multiple
          options={props.categories}
          value={props.service.category}
          freeSolo
          renderInput={params => (
            <TextField
              {...params}
              label="Categories"
              placeholder="Categories"
            />
          )}
          onChange={handleCategoriesChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          options={props.providers}
          value={props.service.provider}
          freeSolo
          renderInput={params => (
            <TextField {...params} label="Provider" placeholder="Provider" />
          )}
          onChange={handleProviderChange}
          selectOnFocus
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          multiple
          options={props.keywords}
          value={props.service.keywords}
          freeSolo
          renderInput={params => (
            <TextField {...params} label="Keywords" placeholder="Keywords" />
          )}
          onChange={handleKeywordsChange}
        />
      </Grid>
    </Grid>
  );
}
