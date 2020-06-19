import React from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import {
  getAvailableImages as fetchAvailableImages,
  uploadImage,
} from '../../mongodbConnection';

interface Props {
  credentials: string;
  setAvailableImages: (availableImages: string[]) => void;
}

export default function ImageInput(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const refreshAvailableImages = () => {
    fetchAvailableImages(props.credentials)
      .then(props.setAvailableImages)
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const handleSave = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        uploadImage(
          props.credentials,
          file.name,
          binaryStr as ArrayBuffer
        ).then(() => refreshAvailableImages());
      };
      reader.readAsDataURL(file);
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        style={{marginTop: 30, float: 'right'}}
      >
        Upload new Icons
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        dialogTitle="Upload Icon to S3 Bucket"
        submitButtonText="S3 upload"
      />
    </>
  );
}
