import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from '@material-ui/core';
import {DemoData, Providers} from '../../../assets/data/dataType';
import CategoryRow from './categoryRows.component';

interface Props {
  setDetailService: (service: DemoData) => void;
  providers: Providers[];
  categories: string[];
  groupedContent: Map<Providers, Map<string, DemoData[]>>;
  filteredContent: DemoData[];
  contentSize: number;
  zoomFactor: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: '500px',
      tableLayout: 'fixed',
    },
    header: {
      backgroundColor: theme.palette.primary.main,
    },
    firstRow: {width: '15%'},
    headerTitle: {
      color: 'white',
      margin: 0,
    },
    emptytable: {
      margin: 0,
      textAlign: 'center',
    },
    headerContentSize: {
      color: 'white',
      margin: 0,
    },
  })
);

export default function Landscape(props: Props) {
  const classes = useStyles();

  const providers = props.providers.sort();
  const categories = props.categories.sort();

  return (
    <Table className={classes.table} size="small">
      <TableHead className={classes.header}>
        <TableRow>
          <TableCell className={classes.firstRow}>
            {props.filteredContent.length !== props.contentSize && (
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.headerContentSize}
              >
                {props.filteredContent.length}/{props.contentSize}
              </Typography>
            )}
          </TableCell>
          {providers.map((provider, j) => (
            <TableCell key={j}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.headerTitle}
              >
                {provider}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.length ? (
          <CategoryRow
            setDetailService={props.setDetailService}
            providers={props.providers}
            categories={props.categories}
            groupedContent={props.groupedContent}
            filteredContent={props.filteredContent}
            zoomFactor={props.zoomFactor}
          />
        ) : (
          <TableRow>
            <TableCell colSpan={providers.length + 1}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.emptytable}
              >
                No Services found.
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
