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
  zoomFactor: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 100,
    },
    header: {
      backgroundColor: theme.palette.primary.main,
    },
    headerTitle: {
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
          <TableCell />
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
            <TableCell>Empty</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
