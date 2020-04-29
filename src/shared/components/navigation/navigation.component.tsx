import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../../assets/logos/DL_Logo.svg';
import {
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Map as MapIcon,
  ViewList as ViewListIcon,
  SvgIconComponent
} from '@material-ui/icons';
import { Card, Link } from '@material-ui/core';
import { urls } from '../../externalURL';
import { FilterComponent } from '../filter/filter.container.component';
import { Location } from 'history';

interface IProps {
  location: Location
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      // backgroundColor: theme.palette.grey[600]
      backgroundColor: theme.palette.primary.main
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    button: {
      color: '#ffffff'
    },
    spacing: {
      flexGrow: 1
    },
    logoCard: {
      flexGrow: 0
    },
    logo: {
      height: 40
    },
    filterIcon: {
      float: 'right',
      color: 'white'
    }
  })
);

const views: Array<{path: string, icon: SvgIconComponent}> = [
  {
    path: '/landscape',
    icon: MapIcon
  }, {
    path: '/',
    icon: ViewListIcon
  }
]

export default function NavigationComponent(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Card className={classes.logoCard}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Card>
          <div className={classes.spacing}/>
          <FilterComponent
            iconClassName={classes.filterIcon}
            displayChips={false}
          />
          {
            views.filter(({path}) => path !== props.location.pathname)
              .map(({path, icon: IconComponent}, index) => {
                return <IconButton key={index} className={classes.button}>
                  <Link href={path}><IconComponent className={classes.button}/></Link>
                </IconButton>
              })
          }
          <IconButton className={classes.button}>
            <Link href={urls.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className={classes.button} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
