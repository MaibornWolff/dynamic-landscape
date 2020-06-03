import {Box, Typography} from '@material-ui/core';
import React from 'react';
import {urls} from '../../../shared/externalURL';
import LinkExternal from '@material-ui/core/Link';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Typography variant="caption" display="block" gutterBottom>
        Made by{' '}
        <LinkExternal href={urls.maibornWolff} target="/blank">
          Maibornwolff
        </LinkExternal>
        {' − '}
        <Link to="/admin" target="">
          Login
        </Link>
      </Typography>
    </Box>
  );
}
