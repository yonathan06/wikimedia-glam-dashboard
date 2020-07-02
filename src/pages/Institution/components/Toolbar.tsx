import React from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "../styles";
import Link from "@material-ui/core/Link";
import {
  Link as RouterLink,
} from "react-router-dom";

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
  return (
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={openDrawer}
        className={clsx(
          classes.menuButton,
          isDrawerOpen && classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Link
        component={RouterLink}
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
        to="/inst/met"
      >
        Met Museum
      </Link>
    </Toolbar>
  );
};

export default AppToolbar;
