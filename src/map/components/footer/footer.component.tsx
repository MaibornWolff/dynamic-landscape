import {Box, Typography} from '@material-ui/core';
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {urls} from '../../../shared/externalURL';
import LinkExternal from '@material-ui/core/Link';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Typography variant="caption" display="block" gutterBottom>
        Made by{' '}
        <LinkExternal href={urls.maibornWolff} target="/blank">
          Maibornwolff
        </LinkExternal>
        {' − '}
        <Link to="/admin" target="" className={classes.link}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}
