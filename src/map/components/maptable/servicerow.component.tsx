import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core';
import {DemoData} from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';

interface Props {
  service: DemoData;
  setDetailService: (service: DemoData) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    tableIcon: {
      height: 30,
      float: 'left',
      width: 30,
    },
  })
);

function ServiceRow(props: Props) {
  const classes = useStyles();

  const setDetailService = () => {
    props.setDetailService(props.service);
  };

  return (
    <TableRow>
      <TableCell>
        <LazyLoad height={30}>
          <img
            src={props.service.img}
            alt={props.service.service}
            className={classes.tableIcon}
          />
        </LazyLoad>
      </TableCell>
      <TableCell>{props.service.service}</TableCell>
      <TableCell component="th" scope="row">
        {props.service.provider}
      </TableCell>
      <TableCell>{props.service.category.join(' | ')}</TableCell>
      <TableCell>
        <Button onClick={setDetailService}>More Information</Button>
      </TableCell>
    </TableRow>
  );
}

export default React.memo(ServiceRow, (prevProps, nextProps) => {
  return prevProps.service === nextProps.service;
});
