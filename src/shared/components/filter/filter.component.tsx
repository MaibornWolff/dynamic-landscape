import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SearchIcon from '@material-ui/icons/Search';
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {DataFilter, DataFilter_only_arrays, Providers,} from '../../../assets/data/dataType';

const Logo = require('./../../../assets/logos/CL_Logo.svg') as string;

interface Props {
  filter: DataFilter;
  possibleFilterValues: DataFilter;
  setFilter: (filter: DataFilter) => void;
  displayChips?: boolean;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    margin: 40,
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right',
    backgroundSize: 100,
  },
  logo: {
    height: 50,
  },
  chip: {
    float: 'right',
    margin: '8px 5px',
  },
  item: {
    marginTop: 20,
  },
  chipSelection: {
    margin: 2,
  },
  category: {
    width: '100%',
  },
  iconButton: {
    float: 'right',
  },
});

export default function FilterComponentContainer(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState({...props.filter});

  const toggleDrawer = (open: boolean) => () => {
    if (!open) {
      props.setFilter(filter);
      setOpen(open);
    } else {
      setOpen(open);
      setFilter({...props.filter});
    }
  };

  const handleChangeSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    console.log(event.target.value);
    setFilter({...filter, category: event.target.value as string[]});
  };

  const handleChangeText = (event: React.ChangeEvent<{value: unknown}>) => {
    console.log(event.target.value);
    setFilter({...filter, fulltext: [event.target.value as string]});
  };

  const handleChangeCheckbox = (
    filterKey: DataFilter_only_arrays,
    value: Providers
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilter({
        ...filter,
        [filterKey]: [...filter[filterKey], value],
      });
    } else {
      setFilter({
        ...filter,
        [filterKey]: (filter[filterKey] as string[]).filter(p => p !== value),
      });
    }
  };

  const getFilterChips = (filterSet: DataFilter) => {
    const chipSet: React.ReactNode[] = [];
    for (const [filter, value] of Object.entries(filterSet)) {
      value.forEach((value: Providers | string) => {
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
    setFilter(newFilter);
    props.setFilter(newFilter);
  };

  return (
    <div>
      <div>
        {/* Icon to open filter window */}
        <IconButton className={classes.iconButton} onClick={toggleDrawer(true)}>
          <SearchIcon />
        </IconButton>
        {/* Chipset of current filter*/}
        {props.displayChips && getFilterChips(props.filter)}
      </div>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.fullList}
            role="presentation"
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Filter Services</Typography>
            </Grid>
            <Grid item xs={12} md={2} className={classes.item}>
              <FormGroup>
                {props.possibleFilterValues.provider.map(
                  (provider: Providers, i: number) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={filter.provider.some(v => v === provider)}
                            onChange={handleChangeCheckbox(
                              'provider',
                              provider as Providers
                            )}
                            value={provider}
                            color="primary"
                          />
                        }
                        label={provider}
                      />
                    );
                  }
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4} className={classes.item}>
              <TextField
                id="standard-basic"
                label="Fulltext"
                value={filter.fulltext}
                onChange={handleChangeText}
              />
            </Grid>
            <Grid item xs={12} md={4} className={classes.item}>
              <FormControl className={classes.category}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  className={classes.category}
                  multiple
                  value={filter.category}
                  onChange={handleChangeSelect}
                  input={<Input id="category-select" />}
                  renderValue={selected => (
                    <div className={classes.chipSelection}>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                >
                  {props.possibleFilterValues.category.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      <Checkbox checked={filter.category.indexOf(cat) > -1} />
                      <ListItemText primary={cat} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className={classes.item}>
              <Button color="primary" onClick={toggleDrawer(false)}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
