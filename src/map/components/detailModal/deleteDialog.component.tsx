import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DemoData} from '../../../assets/data/dataType';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import fetchAllServices, {
  deleteService as deleteServiceInDb,
} from '../../../shared/mongodbConnection';

interface Props {
  service: DemoData;
  open: boolean;
  onClose: (didDelete: boolean) => void;
  adminCredentials: string;
  setContent: (services: DemoData[]) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    Red: {
      color: 'red',
    },
  })
);

export default function DeleteDialog(props: Props) {
  const classes = useStyles();
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = () => {
    setDeleting(true);
    deleteServiceInDb(props.adminCredentials, props.service)
      .then(() => fetchAllServices(true)) // force reload
      .then(services => {
        props.setContent(services);
        setDeleting(false);
        props.onClose(true);
      })
      .catch(err => {
        console.error(err);
        setDeleting(false);
        props.onClose(false);
      });
  };

  return (
    <Dialog open={props.open} onClose={() => props.onClose(false)}>
      {deleting ? (
        <>
          <DialogTitle>Deleting service ...</DialogTitle>
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            Really delete service {props.service.service}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              The service will be deleted from the database and not be available
              to the visitors of the site any more. This can not be undone. Are
              you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => props.onClose(false)}
              color="primary"
              autoFocus
            >
              No
            </Button>
            <Button onClick={handleDelete} className={classes.Red}>
              Yes
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
