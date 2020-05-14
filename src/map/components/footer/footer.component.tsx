import {Box, Typography, Link} from '@material-ui/core';
import React from 'react';
import {urls} from '../../../shared/externalURL';

export default function Footer() {
  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Typography variant="caption" display="block" gutterBottom>
        Made by{' '}
        <Link href={urls.maibornWolff} target="/blank">
          Maibornwolff
        </Link>
      </Typography>
    </Box>
  );
}
