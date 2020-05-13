import {Grid, IconButton, Slider, Theme} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {ZoomIn, ZoomOut} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';

const FACTOR_STEP = 1.1;
const FACTOR_MIN = 0.3;
const FACTOR_MAX = 4;

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
    props.setZoomFactor(Math.min(FACTOR_MAX, props.zoomFactor * FACTOR_STEP));
  const handleZoomOut = () =>
    props.setZoomFactor(Math.max(FACTOR_MIN, props.zoomFactor / FACTOR_STEP));
  const canZoomIn = props.zoomFactor < FACTOR_MAX;
  const canZoomOut = props.zoomFactor > FACTOR_MIN;

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton
          onClick={handleZoomOut}
          className={classes.button}
          disabled={!canZoomOut}
        >
          <ZoomOut />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Slider
          value={props.zoomFactor}
          min={FACTOR_MIN}
          max={FACTOR_MAX}
          scale={x => x ** 2}
          step={0.1}
          onChange={handleChange}
          className={classes.slider}
        />
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleZoomIn}
          className={classes.button}
          disabled={!canZoomIn}
        >
          <ZoomIn />
        </IconButton>
      </Grid>
    </Grid>
  );
}
