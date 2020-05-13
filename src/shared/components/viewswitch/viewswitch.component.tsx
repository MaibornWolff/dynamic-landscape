import {
  Map as MapIcon,
  SvgIconComponent,
  ViewList as ViewListIcon,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Location} from 'history';

interface Props {
  location: Location;
}

const views: Array<{path: string; icon: SvgIconComponent}> = [
  {
    path: '/landscape',
    icon: MapIcon,
  },
  {
    path: '/table',
    icon: ViewListIcon,
  },
];

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      //color: '#ffffff',
    },
  })
);

export default function ViewSwitch(props: Props) {
  const classes = useStyles();

  return (
    <>
      {views
        .filter(({path}) => path !== props.location.pathname)
        .map(({path, icon: IconComponent}, index) => {
          return (
            <IconButton key={index} className={classes.button}>
              <Link to={path} component={RouterLink}>
                <IconComponent className={classes.button} />
              </Link>
            </IconButton>
          );
        })}
    </>
  );
}
