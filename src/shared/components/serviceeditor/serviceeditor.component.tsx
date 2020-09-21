import React from 'react';
import {
  ServiceStatus,
  Service,
  ServiceWithoutId,
} from '../../../assets/data/dataType';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import ImageSelect from './imageSelect.component';

const defaultIcons = new Map([
  ['Amazon', './img/logos/AWS/General/AWS_Simple_Icons_AWS_Cloud.svg'],
  ['Google', './img/logos/Google/Extras/Google Cloud Platform.svg'],
  ['Microsoft', './img/logos/Microsoft/CnE_Cloud/SVG/Azure_logo_icon_50.svg'],
]);

export interface Props<ServiceType extends ServiceWithoutId | Service> {
  title: string;
  service: ServiceType;
  serviceChanged: (service: ServiceType) => void;
  categories: string[];
  providers: string[];
  keywords: string[];
  disabled?: boolean;
  availableImages: string[];
}

export default function ServiceEditor<
  ServiceType extends ServiceWithoutId | Service
>(props: Props<ServiceType>) {
  const handleServiceChange = (changedAttributes: Partial<Service>) =>
    props.serviceChanged({
      ...props.service,
      ...changedAttributes,
    });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleServiceChange({
      service: event.target.value,
    });

  const handleStatusChange = (
    event: React.ChangeEvent<{name?: string | undefined; value: unknown}>
  ) =>
    handleServiceChange({
      status: event.target.value as ServiceStatus,
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
  ) =>
    handleServiceChange({
      provider: value || '',
      img: (value && defaultIcons.get(value)) || '',
      providerIcon: (value && defaultIcons.get(value)) || '',
    });

  const handleKeywordsChange = (
    event: React.ChangeEvent<{}>,
    value: string[] | null
  ) => handleServiceChange({keywords: value || []});

  const handleWeblinkChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleServiceChange({webLink: event.target.value});

  const handleImgChange = (img: string) => handleServiceChange({img});

  const handleProviderIconChange = (providerIcon: string) =>
    handleServiceChange({providerIcon});

  return (
    <Grid container alignContent="stretch" spacing={1}>
      <Grid item xs={12}>
        <h2>{props.title}</h2>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          value={props.service.service}
          onChange={handleNameChange}
          disabled={props.disabled}
          style={{width: '70%', paddingRight: 30}}
        />
        <FormControl>
          <InputLabel shrink id="status-select">
            Status
          </InputLabel>
          <Select
            labelId="status-select"
            value={props.service.status}
            onChange={handleStatusChange}
          >
            <MenuItem value={'published'}>published</MenuItem>
            <MenuItem value={'review'}>review</MenuItem>
            <MenuItem value={'deleted'}>deleted</MenuItem>
          </Select>
          <FormHelperText>
            Only published Services are displayed.
          </FormHelperText>
        </FormControl>
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
        <Autocomplete<string, true, undefined, true>
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
        <Autocomplete<string, undefined, undefined, true>
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
        <Autocomplete<string, true, undefined, true>
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
        <ImageSelect
          textFieldProps={{
            label: 'Icon',
            fullWidth: true,
          }}
          disabled={props.disabled}
          imagePath={props.service.img}
          onImagePathChanged={handleImgChange}
          availableImages={props.availableImages}
        />
      </Grid>
      <Grid item xs={12}>
        <ImageSelect
          textFieldProps={{
            label: 'Provider icon',
            fullWidth: true,
          }}
          disabled={props.disabled}
          imagePath={props.service.providerIcon}
          onImagePathChanged={handleProviderIconChange}
          availableImages={props.availableImages}
        />
      </Grid>
    </Grid>
  );
}
