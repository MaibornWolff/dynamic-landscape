import React, {useEffect, useState} from 'react';
import {Grid, TextField, TextFieldProps} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const PATH_PREFIX = './img/logos/';
const PATH_PREFIX_REGEX = /^[.][/\\]img[/\\]logos[/\\](.*)$/;

export interface Props {
  textFieldProps: TextFieldProps;
  onImagePathChanged: (img: string) => void;
  imagePath: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    notFound: {
      color: 'red',
    },
    icon: {
      height: 45,
    },
  })
);

export default function ImageSelect(props: Props) {
  const classes = useStyles();
  const [imgNotFound, setImgNotFound] = useState(false);

  useEffect(() => {
    setImgNotFound(false);
  }, [props.imagePath]);

  const handleInvalidPath = () => {
    setImgNotFound(true);
  };

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
      <Grid item xs={11}>
        <TextField
          value={shownImgPath}
          onChange={handleImgPathChange}
          fullWidth
          {...props.textFieldProps}
        />
      </Grid>
      <Grid item xs={1}>
        {imgNotFound ? (
          <span className={classes.notFound}>Not found!</span>
        ) : (
          <img
            src={
              props.imagePath.startsWith('.')
                ? props.imagePath.substring(1)
                : props.imagePath
            }
            alt="Service Icon"
            onError={handleInvalidPath}
            className={classes.icon}
          />
        )}
      </Grid>
    </Grid>
  );
}
