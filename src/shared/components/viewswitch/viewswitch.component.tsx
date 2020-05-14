import {
  Map as MapIcon,
  SvgIconComponent,
  ViewList as ViewListIcon,
} from '@material-ui/icons';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Location} from 'history';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useHistory} from 'react-router-dom';

interface Props {
  location: Location;
}

const views: Array<{name: string; path: string; icon: SvgIconComponent}> = [
  {
    name: 'Landscape View',
    path: '/landscape',
    icon: MapIcon,
  },
  {
    name: 'Table View',
    path: '/table',
    icon: ViewListIcon,
  },
];

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      //color: '#ffffff',
    },
    buttonDisabled: {
      color: '#048488 !important',
    },
  })
);

export default function ViewSwitch(props: Props) {
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (even: Record<string, any>, path: string) => {
    history.push(path);
  };

  return (
    <>
      <ToggleButtonGroup
        value={props.location.pathname}
        exclusive
        aria-label="text alignment"
        size="small"
        onChange={handleChange}
      >
        {views
          // .filter(({path}) => path !== props.location.pathnsame)
          .map(({name, path, icon: IconComponent}, index) => {
            return (
              <ToggleButton
                key={index}
                value={path}
                aria-label={name}
                disabled={path === props.location.pathname}
                classes={{disabled: classes.buttonDisabled}}
              >
                <IconComponent className={classes.button} fontSize="small" />
              </ToggleButton>
            );
          })}
      </ToggleButtonGroup>
    </>
  );
}
