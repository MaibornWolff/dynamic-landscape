import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../../assets/logos/CL_Logo_no_background.svg';
import {GitHub as GitHubIcon, Map as MapIcon, SvgIconComponent, ViewList as ViewListIcon} from '@material-ui/icons';
import {Link} from '@material-ui/core';
import {urls} from '../../externalURL';
import {Location} from 'history';
import {Link as RouterLink} from 'react-router-dom'

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
    },
    appName: {
      marginLeft: 10,
      fontSize: 'x-large',
      fontWeight: 500
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
          <div className={classes.logoCard}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </div>
          <span className={classes.appName}>
            Cloud Landscape
          </span>
          <div className={classes.spacing}/>
          <div className={classes.spacing}/>
          {
            views.filter(({path}) => path !== props.location.pathname)
              .map(({path, icon: IconComponent}, index) => {
                return <IconButton key={index} className={classes.button}>
                  <Link to={path} component={RouterLink}>
                    <IconComponent className={classes.button}/>
                  </Link>
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
