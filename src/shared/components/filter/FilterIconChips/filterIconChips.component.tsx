import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Chip, Grid} from '@material-ui/core';
import {DataFilter, Providers} from '../../../../assets/data/dataType';

export interface Props {
  filter: DataFilter;
  setFilter: (filter: DataFilter) => void;
  displayChips?: boolean;
  toggleFilterBar: () => void;
}

const useStyles = makeStyles({
  chip: {
    float: 'right',
    margin: '8px 5px',
  },
  iconButton: {
    float: 'right',
  },
});

export default function FilterIconChipsContainer(props: Props) {
  const classes = useStyles();

  const getFilterChips = (filterSet: DataFilter) => {
    const chipSet: React.ReactNode[] = [];
    for (const [filter, SearchValue] of Object.entries<string[] | Providers[]>(
      filterSet
    )) {
      SearchValue.forEach((value: Providers | string) => {
        chipSet.push(
          <Chip
            key={value as string}
            label={`${filter.replace(/^\w/, c => c.toUpperCase())}:  ${value}`}
            onDelete={() =>
              onChipDelete(filter as keyof typeof props.filter, value as string)
            }
            color="primary"
            className={classes.chip}
          />
        );
      });
    }
    return chipSet;
  };

  const onChipDelete = (
    filterKey: keyof typeof props.filter,
    value: string
  ): void => {
    const newFilter = {
      ...props.filter,
      [filterKey]: (props.filter[filterKey] as string[]).filter(
        p => p !== value
      ),
    };
    props.setFilter(newFilter);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-end"
      role="presentation"
    >
      {/* Icon to open filter window */}
      {/* <IconButton
        className={classes.iconButton}
        onClick={props.toggleFilterBar}
      >
        <SearchIcon />
      </IconButton> */}
      {/* Chipset of current filter*/}
      {props.displayChips && getFilterChips(props.filter)}
    </Grid>
  );
}
