import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {
  GitHub as GitHubIcon,
  AddToPhotos,
  // Share as ShareIcon,
  InfoTwoTone,
} from '@material-ui/icons';

import LinkExternal from '@material-ui/core/Link';
import {urls} from '../../externalURL';
import {SearchBar} from '../filter/SearchBar/SearchBar.container.component';
import {Link} from 'react-router-dom';
import InfoModal from './../infoModal/detailModal.component';

const Logo = require('./../../../assets/logos/CL_Logo.svg') as string;
interface Props {
  adminCredentials?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // backgroundColor: theme.palette.grey[600]
      backgroundColor: theme.palette.primary.main,
      zIndex: theme.zIndex.drawer + 1,
      flexGrow: 1,
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
      textDecoration: 'none',
      color: 'inherit',
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
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

export default function NavigationComponent(props: Props) {
  const classes = useStyles();
  const [infoOpen, setInfoOpen] = React.useState(false);
  const handleInfoOpen = () => {
    setInfoOpen(!infoOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.logoCard}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Link>
          <Link to="/" className={classes.appName}>
            Cloud Landscape
          </Link>
          <div className={classes.spacing} />
          <SearchBar />
          <div className={classes.spacing} />
          {props.adminCredentials && (
            <Link to="/admin/add">
              <IconButton className={classes.button}>
                <AddToPhotos className={classes.button} />
              </IconButton>
            </Link>
          )}
          <IconButton onClick={handleInfoOpen} className={classes.button}>
            <InfoTwoTone className={classes.button} style={{fontSize: 30}} />
            <InfoModal open={infoOpen} handleClose={handleInfoOpen} />
          </IconButton>
          {/* for later IDEAS: <IconButton onClick={handleInfoOpen} className={classes.button}>
            <ShareIcon className={classes.button} />
          </IconButton> */}
          <LinkExternal
            href={urls.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton className={classes.button}>
              <GitHubIcon className={classes.button} />
            </IconButton>
          </LinkExternal>
        </Toolbar>
      </AppBar>
    </>
  );
}
