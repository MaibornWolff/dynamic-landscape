import React from 'react';
import ServiceButton from './servicebutton.component';
import {Service, Providers} from '../../../assets/data/dataType';
import {createStyles, TableCell, TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {sortBy} from 'lodash';

interface Props {
  setDetailService: (service: Service) => void;
  providers: Providers[];
  categories: string[];
  groupedContent: Map<Providers, Map<string, Service[]>>;
  filteredContent: Service[];
  zoomFactor: number;
}

const useStyles = makeStyles(
  createStyles({
    tableCell: (props: {zoomFactor: number}) => ({
      fontSize: `${props.zoomFactor * 100}%`,
      paddingTop: `${Math.min(1, props.zoomFactor) * 6}px`,
      paddingRight: `${Math.min(1, props.zoomFactor) * 24}px`,
      paddingBottom: `${Math.min(1, props.zoomFactor) * 6}px`,
      paddingLeft: `${Math.min(1, props.zoomFactor) * 16}px`,
    }),
  })
);

function CategoryRows(props: Props) {
  const classes = useStyles({zoomFactor: props.zoomFactor});

  const getServicesByProviderAndCategory = (
    provider: Providers,
    category: string
  ): Service[] =>
    sortBy(
      props.groupedContent.get(provider)?.get(category),
      service => service.service
    ) || [];

  const isServiceFiltered = (service: Service): boolean =>
    !props.filteredContent.includes(service);

  let noUnfilteredServiceYet = true;

  return (
    <>
      {props.categories.map((category, i) => (
        <TableRow key={i}>
          <TableCell component="th" scope="row" className={classes.tableCell}>
            {category}
          </TableCell>
          {props.providers.map((provider, j) => (
            <TableCell key={j} className={classes.tableCell}>
              {getServicesByProviderAndCategory(provider, category).map(
                (service, index) => {
                  const isFiltered = isServiceFiltered(service);
                  const isFirstUnfiltered =
                    noUnfilteredServiceYet && !isFiltered;
                  if (isFirstUnfiltered) noUnfilteredServiceYet = false;
                  return (
                    <ServiceButton
                      key={index}
                      service={service}
                      setDetailService={props.setDetailService}
                      isFiltered={isFiltered}
                      zoomFactor={props.zoomFactor}
                      shouldScroll={isFirstUnfiltered}
                    />
                  );
                }
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default React.memo(CategoryRows);
