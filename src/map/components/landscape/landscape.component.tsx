import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid, IconButton, Tooltip, Typography} from '@material-ui/core';
import {uniq} from 'lodash';
import {DemoData, Providers} from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';
import {FilterComponent} from '../../../shared/components/filter/filter.container.component';

interface IProps {
  content: Array<DemoData>;
  setDetailService: (service: DemoData) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
    paper: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      minWidth: 100
    },
    serviceIcon: {
      height: 25,
      width: 25
    },
    filterIcon: {
      float: 'right'
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

  const providers = uniq(props.content.map(service => service.provider));
  const categories = uniq(props.content.flatMap(service => service.category));
  const getServices = (provider: Providers, category: string) =>
    props.content.filter(service => service.provider === provider && service.category.includes(category));

  const setDetailService = (event: any, service: DemoData) => {
    props.setDetailService(service);
  };

  return (
    <Grid item xs={11} className={classes.card}>
      <FilterComponent iconClassName={classes.filterIcon} displayChips={true}/>
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
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
                    {getServices(provider, category).map((service, k) =>
                      <Tooltip title={service.service}>
                        <IconButton key={k} aria-label={service.service}
                                    onClick={event => setDetailService(event, service)}>
                          <LazyLoad height={25}>
                            <img
                              src={service.img}
                              alt={service.service}
                              className={classes.serviceIcon}
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
        </Table>
      </Paper>
    </Grid>
  );
}
