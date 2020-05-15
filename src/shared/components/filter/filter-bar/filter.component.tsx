import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Drawer,
  Divider,
  Box,
  ListItem,
  List,
  Paper,
} from '@material-ui/core';
import {
  DataFilter,
  DataFilter_only_arrays,
  Providers,
  ServiceFeatures,
} from '../../../../assets/data/dataType';
import {SearchBar} from '../SearchBar/SearchBar.container.component';
import {IconButton, Tooltip} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

const Logo = require('./../../../../assets/logos/CL_Logo.svg') as string;

export interface Props {
  filter: DataFilter;
  possibleFilterValues: ServiceFeatures;
  setFilter: (filter: DataFilter) => void;
  toggleFilterBar: () => void;
  open: boolean;
  displayChips?: boolean;
}

const drawerWidth = 240;
const drawerPedding = 70;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: drawerPedding,
    color: '#6d6d6d',
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: drawerPedding,
    color: '#6d6d6d',
  },
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
  drawitem: {
    padding: '10px 15px',
  },
  menuitem: {
    padding: '0px 15px',
  },
  menulist: {
    maxHeight: '300px',
    overflow: 'scroll',
    scrollBehavior: 'smooth',
  },
  closeIcon: {
    float: 'right',
  },
  openButton: {
    width: 'fit-content',
    position: 'fixed',
    left: '-5px',
    marginTop: '6px',
  },
});

export default function FilterComponentContainer(props: Props) {
  const classes = useStyles();

  const handleChangeCheckbox = (
    filterKey: DataFilter_only_arrays,
    value: Providers | string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.setFilter({
        ...props.filter,
        [filterKey]: [...props.filter[filterKey], value],
      });
    } else {
      props.setFilter({
        ...props.filter,
        [filterKey]: (props.filter[filterKey] as string[]).filter(
          p => p !== value
        ),
      });
    }
  };

  return (
    <>
      <Drawer
        anchor="left"
        variant="persistent"
        open={props.open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawitem}>
          <div className={classes.closeIcon}>
            <IconButton onClick={props.toggleFilterBar}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Typography variant="subtitle1">Filter</Typography>
          <Typography variant="caption">Cloud Services</Typography>
        </Box>
        <Divider />
        <Box className={classes.drawitem} style={{marginLeft: '-40px'}}>
          <SearchBar />
        </Box>
        <Divider />

        <List className={classes.menulist}>
          <Typography variant="caption" className={classes.menuitem}>
            Provider
          </Typography>
          {props.possibleFilterValues.provider
            .sort()
            .map((provider: Providers, i: number) => {
              return (
                <ListItem key={i} button className={classes.menuitem}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.filter.provider.some(
                          v => v === provider
                        )}
                        onChange={handleChangeCheckbox(
                          'provider',
                          provider as Providers
                        )}
                        value={provider}
                        color="primary"
                        size="small"
                      />
                    }
                    label={provider}
                  />
                </ListItem>
              );
            })}
        </List>
        <Divider />

        <List className={classes.menulist}>
          <Typography variant="caption" className={classes.menuitem}>
            Categories
          </Typography>

          {props.possibleFilterValues.category
            .sort()
            .map((category: string, i: number) => {
              return (
                <ListItem key={i} button className={classes.menuitem}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={props.filter.category.some(
                          v => v === category
                        )}
                        onChange={handleChangeCheckbox(
                          'category',
                          category as string
                        )}
                        value={category}
                        color="primary"
                        size="small"
                      />
                    }
                    label={category}
                  />
                </ListItem>
              );
            })}
        </List>
        <Divider />
      </Drawer>
      <Paper elevation={3} className={classes.openButton}>
        <Tooltip title={'Open Searchbar'}>
          <IconButton onClick={props.toggleFilterBar}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
}
