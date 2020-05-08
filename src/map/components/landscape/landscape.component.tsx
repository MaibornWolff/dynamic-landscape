import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IconButton, Tooltip, Typography} from '@material-ui/core';
import {DemoData, Providers} from '../../../assets/data/dataType';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';

interface Props {
  setDetailService: (service: DemoData) => void;
  providers: Array<Providers>;
  categories: Array<string>;
  content: Array<DemoData>;
  filteredContent: Array<DemoData>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 100,
    },
    serviceButton: {
      padding: 3,
    },
    serviceIcon: {
      height: 25,
      width: 25,
    },
    filteredService: {
      opacity: 0.15,
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
  const firstUnfilteredService = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    firstUnfilteredService.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  });

  const providers = props.providers.sort();
  const categories = props.categories.sort();
  const setDetailService = (service: DemoData) => {
    props.setDetailService(service);
  };

  const getServicesByProviderAndCategory = (
    provider: Providers,
    category: string
  ): Array<DemoData> =>
    props.content.filter(
      (service: DemoData) =>
        service.provider === provider && service.category.includes(category)
    );

  const isServiceFiltered = (service: DemoData): boolean =>
    !props.filteredContent.includes(service);

  const renderService = (
    service: DemoData,
    index: number,
    isFiltered: boolean,
    isFirstUnfiltered: boolean
  ) => (
    <Tooltip key={index} title={service.service}>
      <IconButton
        aria-label={service.service}
        onClick={() => setDetailService(service)}
        className={classes.serviceButton}
        ref={isFirstUnfiltered ? firstUnfilteredService : undefined}
      >
        <LazyLoad height={25}>
          <img
            src={service.img}
            alt={service.service}
            className={classNames(
              classes.serviceIcon,
              isFiltered && classes.filteredService
            )}
          />
        </LazyLoad>
      </IconButton>
    </Tooltip>
  );

  const renderCategories = () => {
    let noUnfilteredServiceYet = true;
    return categories.map((category, i) => (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          {category}
        </TableCell>
        {providers.map((provider, j) => (
          <TableCell key={j}>
            {getServicesByProviderAndCategory(provider, category).map(
              (service, index) => {
                const isFiltered = isServiceFiltered(service);
                const isFirstUnfiltered = noUnfilteredServiceYet && !isFiltered;
                if (isFirstUnfiltered) noUnfilteredServiceYet = false;
                return renderService(
                  service,
                  index,
                  isFiltered,
                  isFirstUnfiltered
                );
              }
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

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
        {renderCategories()}
        {!categories.length && (
          <TableRow>
            <TableCell>Empty</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
