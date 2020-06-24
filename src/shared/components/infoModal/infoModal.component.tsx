import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, {PaperProps} from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {
  Grid,
  Slide,
  SlideProps,
  Typography,
  Divider,
  Hidden,
} from '@material-ui/core';
import LinkExternal from '@material-ui/core/Link';
import {urls} from '../../externalURL';

const Logo = require('./../../../assets/logos/CL_Logo.svg') as string;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {},
    icon: {
      width: 90,
      paddingRight: 40,
    },
    ListItemIcon: {
      minWidth: 35,
    },
    InfoButton: {
      textTransform: 'inherit',
    },
    Red: {
      color: 'red',
    },
    Divider: {marginTop: 30, marginBottom: 30},
  })
);

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props: PaperProps) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function InfoModal(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className={classes.dialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <img src={Logo} alt="Logo" className={classes.icon} />
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <Typography variant="h3" component="h2">
                  CloudLandscape
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={10}>
              <DialogContentText>
                Cloud Landscape is a web-based visualization tool. It was
                initially designed to visualize the set of cloud services
                provided by Microsoft (Azure), Amazon (AWS) and Google (GCP).
                This project includes the respective database for demonstration
                purposes. Our Cloud Landscape tool also provides a basic search
                functionality for the items in your database. <br />
                At the top of the page you will find the search input. The
                search runs using the logical “AND” so an item has to match all
                of the entered keywords. In order to zoom the contents of the
                page use the zoom buttons to the left of the search bar. You can
                either zoom everything (left toolbox) or only the text (right
                toolbox). Press the button between the two toolboxes to reset
                the zoom.
              </DialogContentText>
              <Divider className={classes.Divider} />
              <DialogContentText>
                Made with&nbsp;
                <span role="img" aria-label="Love">
                  {'❤️'}
                </span>
                &nbsp; by the
                <LinkExternal href={urls.maibornWolff} target="/blank">
                  MaibornWolff
                </LinkExternal>{' '}
                DevOps & Cloud Native team.
              </DialogContentText>
              <Divider className={classes.Divider} />
              <DialogContentText>
                MaibornWolff GmbH <br />
                Theresienhöhe 13 <br />
                80339 München <br /> <br />
                Telefon:{' '}
                <LinkExternal href="tel:004989544253000">
                  +49 89 544 253 000
                </LinkExternal>{' '}
                <br />
                E-Mail:{' '}
                <LinkExternal href="mailto: info@maibornwolff.de">
                  info@maibornwolff.de
                </LinkExternal>{' '}
                <br />
                Internet:{' '}
                <LinkExternal href={urls.maibornWolff} target="/blank">
                  www.maibornwolff.de
                </LinkExternal>
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
