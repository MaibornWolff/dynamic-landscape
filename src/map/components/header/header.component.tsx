import {createStyles, Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import {FilterIconChips} from '../../../shared/components/filter/FilterIconChips/FilterIconChips.container.component';
import ViewSwitch from '../../../shared/components/viewswitch/viewswitch.container.component';
import Zoom from '../../../shared/components/zoom/zoom.container.component';
import {Location, History} from 'history';
import {match} from 'react-router';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      paddingBottom: '10px',
    },
  })
);

export interface Props {
  toggleFilterBar: () => void;
  location: Location;
  history: History;
  match: match;
}

export default function Header(props: Props) {
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
      <Grid item xs={12} md={8}>
        <FilterIconChips
          displayChips={true}
          toggleFilterBar={props.toggleFilterBar}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          role="presentation"
        >
          {props.location.pathname === '/landscape' && (
            <Grid item xs={12} sm={11}>
              <Zoom />
            </Grid>
          )}
          <Grid item xs={1} sm={1}>
            <ViewSwitch />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
