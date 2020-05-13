import {Grid} from '@material-ui/core';
import React from 'react';
import {FilterComponent} from '../../../shared/components/filter/filter.container.component';
import ViewSwitch from '../../../shared/components/viewswitch/viewswitch.container.component';
import Zoom from '../../../shared/components/zoom/zoom.container.component';

export default function Header() {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
      role="presentation"
    >
      <Grid item xs={12} md={8}>
        <FilterComponent displayChips={true} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          role="presentation"
        >
          <Grid item xs={12} sm={11}>
            <Zoom />
          </Grid>
          <Grid item xs={1} sm={1}>
            <ViewSwitch />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
