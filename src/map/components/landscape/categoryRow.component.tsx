import React, {useEffect} from 'react';
import ServiceButton from './servicebutton.component';
import {Providers, DemoData} from '../../../assets/data/dataType';
import {TableRow, TableCell, createStyles} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

interface Props {
  setDetailService: (service: DemoData) => void;
  providers: Array<Providers>;
  categories: Array<string>;
  groupedContent: Map<Providers, Map<string, DemoData[]>>;
  filteredContent: Array<DemoData>;
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

function CategoryRow(props: Props) {
  const firstUnfilteredService = React.createRef<HTMLButtonElement>();
  const classes = useStyles({zoomFactor: props.zoomFactor});

  useEffect(() => {
    firstUnfilteredService.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  });

  const getServicesByProviderAndCategory = (
    provider: Providers,
    category: string
  ): Array<DemoData> => props.groupedContent.get(provider)?.get(category) || [];

  const isServiceFiltered = (service: DemoData): boolean =>
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
                      buttonRef={
                        isFirstUnfiltered ? firstUnfilteredService : undefined
                      }
                      zoomFactor={props.zoomFactor}
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

export default React.memo(CategoryRow, (prevProps, nextProps) => {
  return (
    prevProps.filteredContent === nextProps.filteredContent &&
    prevProps.zoomFactor === nextProps.zoomFactor
  );
});
