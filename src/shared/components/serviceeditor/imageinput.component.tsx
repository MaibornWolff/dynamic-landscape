import React from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';

interface Props {}

export default function ImageInput(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState('NULL');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files: any) => {
    setFile(files);
    setOpen(false);
    console.log(files);
    alert(files[0].name + ' saved.');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Upload new Icons</Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        dialogTitle="Upload Icon to S3 Bucket"
        submitButtonText="S3 upload"
      />
    </div>
  );
}
