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
import {DemoData} from '../../../assets/data/dataType';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from '@material-ui/core';
import WebIcon from '@material-ui/icons/Web';

interface Props {
  service: DemoData;
  deleteDetailService: () => void;
  adminCredentials?: string;
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

export default function DetailModal(props: Props) {
  const classes = useStyles();
  const handleClose = props.deleteDetailService;
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
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
              <img
                src={props.service.img}
                alt="Service Icon"
                className={classes.icon}
              />
            </Grid>
            <Grid item>
              <Typography variant="h3" component="h2">
                {props.service.provider === props.service.service.split(' ')[0]
                  ? ''
                  : props.service.provider}{' '}
                {props.service.service}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Category: <strong>{props.service.category.join(' | ')}</strong>
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <DialogContentText>{props.service.description}</DialogContentText>
            </Grid>
            <Grid item xs={12} md={4}>
              <List dense={true} disablePadding={true}>
                <ListItem>
                  <Button
                    href={props.service.webLink}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.InfoButton}
                  >
                    <ListItemIcon className={classes.ListItemIcon}>
                      <WebIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={props.service.webLink.split('/')[2]}
                    />
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {props.adminCredentials ? (
            <>
              <Button className={classes.Red}>Delete</Button>
              <Button className={classes.Red}>Edit</Button>
            </>
          ) : undefined}
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
