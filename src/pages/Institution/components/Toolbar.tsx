import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useGlamData } from '../../../api/hook';

interface AppToolbarProps {
  drawerWidth: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
}

const AppToolbar = ({
  drawerWidth,
  isDrawerOpen,
  openDrawer,
}: AppToolbarProps) => {
  const classes = useStyles({ drawerWidth });
  let { params, url } = useRouteMatch<{ glamId: string }>();
  const { data } = useGlamData(params.glamId);
  return (
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={openDrawer}
        className={clsx(
          classes.menuButton,
          isDrawerOpen && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Link
        variant='h6'
        color='inherit'
        noWrap
        className={classes.title}
        component={RouterLink}
        to={url}
      >
        {data?.name}
      </Link>
    </Toolbar>
  );
};

export default AppToolbar;
