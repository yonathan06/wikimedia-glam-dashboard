import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles, colors } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { NavLink, NavLinkProps, useRouteMatch } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGlamMediaItems } from '../../../api/hook';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
    backgroundColor: colors.blue[50],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomRouterLink = forwardRef<HTMLDivElement | null, NavLinkProps>(
  (props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <NavLink {...props} />
    </div>
  )
);

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const AppDrawer = ({ open, onClose, drawerWidth }: DrawerProps) => {
  const classes = useStyles();
  const { params } = useRouteMatch<{ glamId: string }>();
  const { data: items, isLoading: loadingMediaItems } = useGlamMediaItems(
    params.glamId
  );

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Box p={4} textAlign='center'>
        <TrendingUpIcon fontSize='large' />
        <Typography variant='h6' align='center'>
          Wikimedia GLAM Analytics
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <Button
            exact
            component={CustomRouterLink}
            to={`/glam/met`}
            activeClassName={classes.active}
            className={classes.button}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
        </ListItem>
        {loadingMediaItems && <CircularProgress />}
        {items?.map((item) => (
          <ListItem key={item.file_path} className={classes.nested}>
            <Button
              component={CustomRouterLink}
              to={`/glam/met/file/${encodeURIComponent(item.file_path)}`}
              activeClassName={classes.active}
              className={classes.button}
              startIcon={<ImageIcon />}
            >
              {item.title}
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Button
            component={CustomRouterLink}
            to={`/glam/met/settings`}
            activeClassName={classes.active}
            className={classes.button}
            startIcon={<SettingsIcon />}
          >
            Settings
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
