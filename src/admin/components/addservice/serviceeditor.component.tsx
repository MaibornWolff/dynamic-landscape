import React from 'react';
import {DemoData} from '../../../assets/data/dataType';
import {Chip, Grid, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

export interface Props {
  service: DemoData;
  serviceChanged: (service: DemoData) => void;
  categories: string[];
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
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                key={index}
                variant="outlined"
                label={option}
                {...getTagProps({index})}
              />
            ))
          }
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
    </Grid>
  );
}
