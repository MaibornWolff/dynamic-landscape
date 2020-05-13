import {Grid, Slider} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {ZoomIn, ZoomOut} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';

export interface Props {
  zoomFactor: number;
  setZoomFactor: (zoomFactor: number) => void;
}

const useStyles = makeStyles({
  container: {
    maxWidth: 200,
  },
  slider: {
    color: 'white',
    minWidth: 100,
  },
});

export default function Zoom(props: Props) {
  const classes = useStyles();

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]) =>
    props.setZoomFactor(newValue as number);

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item>
          <ZoomOut />
        </Grid>
        <Grid item xs>
          <Slider
            defaultValue={props.zoomFactor}
            min={0.05}
            max={10}
            scale={x => x ** 2}
            step={0.1}
            onChange={handleChange}
            className={classes.slider}
          />
        </Grid>
        <Grid item>
          <ZoomIn />
        </Grid>
      </Grid>
    </div>
  );
}
