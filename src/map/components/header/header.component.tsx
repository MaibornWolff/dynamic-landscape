import {Grid, createStyles, makeStyles} from '@material-ui/core';
import React from 'react';
import {FilterComponent} from '../../../shared/components/filter/filter.container.component';
import ViewSwitch from '../../../shared/components/viewswitch/viewswitch.container.component';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      paddingBottom: '10px',
    },
  })
);

export default function Header() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
      role="presentation"
      className={classes.header}
    >
      <Grid item xs={8} md={8}>
        <FilterComponent displayChips={true} />
      </Grid>
      <Grid item xs={4} md={4}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
          role="presentation"
        >
          <ViewSwitch />
        </Grid>
      </Grid>
    </Grid>
  );
}
