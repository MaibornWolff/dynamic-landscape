import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IconButton, Tooltip, Typography} from '@material-ui/core';
import {DemoData, Providers} from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';
import classNames from "classnames";

interface IProps {
  setDetailService: (service: DemoData) => void;
  providers: Array<Providers>;
  categories: Array<string>;
  getServices: (provider: Providers, category: string) => Array<DemoData>;
  isFiltered: (service: DemoData) => boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 100
    },
    serviceButton: {
      padding: 3
    },
    serviceIcon: {
      height: 25,
      width: 25
    },
    filteredService: {
      opacity: 0.15
    },
    header: {
      backgroundColor: theme.palette.primary.main
    },
    headerTitle: {
      color: 'white',
      margin: 0
    }
  })
);

export default function Landscape(props: IProps) {
  const classes = useStyles();

  const providers = props.providers.sort();
  const categories = props.categories.sort();
  const setDetailService = (event: any, service: DemoData) => {
    props.setDetailService(service);
  };

  return <Table
    className={classes.table}
    size="small"
  >
    <TableHead className={classes.header}>
      <TableRow>
        <TableCell/>
        {providers.map((provider, j) =>
          <TableCell key={j}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.headerTitle}
            >
              {provider}
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {categories.map((category, i) => (
        <TableRow key={i}>
          <TableCell component="th" scope="row">
            {category}
          </TableCell>
          {providers.map((provider, j) =>
            <TableCell key={j}>
              {props.getServices(provider, category).map((service, k) =>
                <Tooltip title={service.service}>
                  <IconButton key={k} aria-label={service.service}
                              onClick={event => setDetailService(event, service)}
                              className={classes.serviceButton}>
                    <LazyLoad height={25}>
                      <img
                        src={service.img}
                        alt={service.service}
                        className={classNames(classes.serviceIcon, {[classes.filteredService]: props.isFiltered(service)})}
                      />
                    </LazyLoad>
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
      {!categories.length && (
        <TableRow>
          <TableCell>Empty</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>;
}
