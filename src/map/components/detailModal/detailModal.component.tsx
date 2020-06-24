import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Service} from '../../../assets/data/dataType';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  SlideProps,
  Typography,
} from '@material-ui/core';
import WebIcon from '@material-ui/icons/Web';
import DeleteDialog from './deleteDialog.component';
import {useHistory} from 'react-router';
import ServiceIcon from '../../../shared/components/serviceIcon/serviceIcon.component';

interface Props {
  service: Service;
  deleteDetailService: () => void;
  adminCredentials?: string;
  setContent: (services: Service[]) => void;
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

export default function DetailModal(props: Props) {
  const classes = useStyles();
  const handleClose = props.deleteDetailService;
  const history = useHistory();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const handleDelete = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = (didDelete: boolean) => {
    setDeleteDialogOpen(false);
    if (didDelete) {
      handleClose();
    }
  };
  const handleEdit = () => {
    history.push(`/admin/edit/${props.service._id}`);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
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
              <ServiceIcon
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
              <Button className={classes.Red} onClick={handleDelete}>
                Delete
              </Button>
              <DeleteDialog
                service={props.service}
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                adminCredentials={props.adminCredentials}
                setContent={props.setContent}
              />
              <Button className={classes.Red} onClick={handleEdit}>
                Edit
              </Button>
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
