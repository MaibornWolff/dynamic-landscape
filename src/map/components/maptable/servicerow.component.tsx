import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link, Hidden} from '@material-ui/core';
import {Service} from '../../../assets/data/dataType';
import ServiceIcon from '../../../shared/components/serviceIcon/serviceIcon.component';

interface Props {
  service: Service;
  setDetailService: (service: Service) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    tableIcon: {
      height: 30,
      float: 'left',
      width: 30,
    },
    tableRow: {
      cursor: 'pointer',
    },
  })
);

function ServiceRow(props: Props) {
  const classes = useStyles();

  const setDetailService = () => {
    props.setDetailService(props.service);
  };

  return (
    <TableRow hover onClick={setDetailService} className={classes.tableRow}>
      <TableCell>
        <ServiceIcon
          src={props.service.img}
          alt={props.service.service}
          className={classes.tableIcon}
        />
      </TableCell>
      <TableCell>{props.service.service}</TableCell>
      <Hidden xsDown>
        <TableCell component="th" scope="row">
          {props.service.provider}
        </TableCell>
      </Hidden>
      <TableCell>{props.service.category.join(' | ')}</TableCell>
      <Hidden xsDown>
        <TableCell>
          <Link href={props.service.webLink} target="_blank" rel="noreferrer">
            {props.service.webLink.split('/')[2]}
          </Link>
        </TableCell>
      </Hidden>
    </TableRow>
  );
}

export default React.memo(ServiceRow, (prevProps, nextProps) => {
  return prevProps.service === nextProps.service;
});
