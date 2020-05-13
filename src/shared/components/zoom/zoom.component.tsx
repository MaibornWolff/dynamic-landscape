import {Grid, IconButton, Slider, Theme} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {ZoomIn, ZoomOut} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';

const FACTOR_STEP = 1.1;

export interface Props {
  zoomFactor: number;
  setZoomFactor: (zoomFactor: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  slider: {
    color: theme.palette.primary.main,
    minWidth: 100,
  },
  button: {
    color: theme.palette.primary.main,
  },
}));

export default function Zoom(props: Props) {
  const classes = useStyles();

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]) => {
    props.setZoomFactor(newValue as number);
  };

  const handleZoomIn = () =>
    props.setZoomFactor(props.zoomFactor * FACTOR_STEP);
  const handleZoomOut = () =>
    props.setZoomFactor(props.zoomFactor / FACTOR_STEP);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton onClick={handleZoomOut} className={classes.button}>
          <ZoomOut />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Slider
          value={props.zoomFactor}
          min={0}
          max={10}
          scale={x => x ** 2}
          step={0.1}
          onChange={handleChange}
          className={classes.slider}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={handleZoomIn} className={classes.button}>
          <ZoomIn />
        </IconButton>
      </Grid>
    </Grid>
  );
}
