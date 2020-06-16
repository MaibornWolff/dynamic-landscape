import React from 'react';
import {DemoData, DemoDataWithoutId} from '../../../assets/data/dataType';
import {Grid, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import ImageInput from './imageinput.component';

export interface Props<ServiceType extends DemoDataWithoutId | DemoData> {
  service: ServiceType;
  serviceChanged: (service: ServiceType) => void;
  categories: string[];
  providers: string[];
  keywords: string[];
  disabled?: boolean;
}

export default function ServiceEditor<
  ServiceType extends DemoDataWithoutId | DemoData
>(props: Props<ServiceType>) {
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

  const handleWeblinkChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleServiceChange({webLink: event.target.value});

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleServiceChange({img: event.target.value});

  const handleProviderIconChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => handleServiceChange({providerIcon: event.target.value});

  return (
    <Grid container direction="column" alignContent="stretch" spacing={1}>
      <Grid item xs={12}>
        <ImageInput />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          value={props.service.service}
          onChange={handleNameChange}
          disabled={props.disabled}
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
          disabled={props.disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          multiple
          options={props.categories}
          value={props.service.category}
          renderInput={params => (
            <TextField
              {...params}
              label="Categories"
              placeholder="Categories"
            />
          )}
          onChange={handleCategoriesChange}
          disabled={props.disabled}
          fullWidth
          autoSelect
          freeSolo
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          options={props.providers}
          value={props.service.provider}
          renderInput={params => (
            <TextField {...params} label="Provider" placeholder="Provider" />
          )}
          onChange={handleProviderChange}
          disabled={props.disabled}
          fullWidth
          autoSelect
          freeSolo
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete<string>
          multiple
          options={props.keywords}
          value={props.service.keywords}
          renderInput={params => (
            <TextField {...params} label="Keywords" placeholder="Keywords" />
          )}
          onChange={handleKeywordsChange}
          disabled={props.disabled}
          fullWidth
          autoSelect
          freeSolo
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Weblink"
          value={props.service.webLink}
          onChange={handleWeblinkChange}
          disabled={props.disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Icon"
          value={props.service.img}
          onChange={handleImgChange}
          disabled={props.disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Provider icon"
          value={props.service.providerIcon}
          onChange={handleProviderIconChange}
          disabled={props.disabled}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
