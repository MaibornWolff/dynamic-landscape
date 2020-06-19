import React from 'react';
import {Grid, TextField, TextFieldProps} from '@material-ui/core';
import ServiceIcon from '../serviceIcon/serviceIcon.component';

const PATH_PREFIX = './img/logos/';
const PATH_PREFIX_REGEX = /^[.]?[/\\]?img[/\\]logos[/\\](.*)$/;

export interface Props {
  textFieldProps: TextFieldProps;
  onImagePathChanged: (img: string) => void;
  imagePath: string;
  availableImages: string[];
  disabled?: boolean;
}

export default function ImageSelect(props: Props) {
  const handleImgPathChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onImagePathChanged(convertFromShownImgPath(event.target.value));

  const convertFromShownImgPath = (shownPath: string) =>
    PATH_PREFIX + shownPath;
  const convertToShownImgPath = (path: string) => {
    const matches = PATH_PREFIX_REGEX.exec(path);
    if (!matches || matches.length < 2) {
      return path;
    }
    return matches[1];
  };

  const shownImgPath = convertToShownImgPath(props.imagePath);
  return (
    <Grid container>
      <Grid item xs={1}>
        <ServiceIcon
          height={45}
          src={
            props.imagePath.startsWith('.')
              ? props.imagePath.substring(1)
              : props.imagePath
          }
          alt="Service Icon"
        />
      </Grid>
      <Grid item xs={11}>
        <Autocomplete<string>
          options={props.availableImages.map(convertToShownImgPath)}
          value={shownImgPath || null}
          renderInput={params => (
            <TextField {...params} {...props.textFieldProps} />
          )}
          onChange={handleImgPathChange}
          disabled={props.disabled}
          fullWidth
          autoSelect
          autoComplete
        />
      </Grid>
    </Grid>
  );
}
