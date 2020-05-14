import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {GitHub as GitHubIcon} from '@material-ui/icons';
import {Link} from '@material-ui/core';
import {urls} from '../../externalURL';

const Logo = require('./../../../assets/logos/CL_Logo.svg') as string;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      // backgroundColor: theme.palette.grey[600]
      backgroundColor: theme.palette.primary.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      color: '#ffffff',
    },
    spacing: {
      flexGrow: 1,
    },
    logoCard: {
      flexGrow: 0,
    },
    logo: {
      height: 40,
    },
    filterIcon: {
      float: 'right',
      color: 'white',
    },
    appName: {
      marginLeft: 10,
      fontSize: 'x-large',
      fontWeight: 500,
    },
  })
);

export default function NavigationComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logoCard}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </div>
          <span className={classes.appName}>Cloud Landscape</span>
          <div className={classes.spacing} />
          <div className={classes.spacing} />
          <Link href={urls.github} target="_blank" rel="noopener noreferrer">
            <IconButton className={classes.button}>
              <GitHubIcon className={classes.button} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
