import React, { forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, colors } from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { NavLink, NavLinkProps } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMediaItemsList } from "../../../api/hook";
import { useStyles } from "../styles";

const useItemsStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
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
  const classes = useStyles({ drawerWidth });
  const listItemClasses = useItemsStyles();
  const { data: items, loading: loadingMediaItems } = useMediaItemsList();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      {/* <div className={classes.toolbarIcon}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div> */}
      <Box p={4}>
        <Typography variant="h6" align="center">
          Wikimedia GLAM Analytics
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <Button
            exact
            component={CustomRouterLink}
            to={`/inst/met`}
            activeClassName={listItemClasses.active}
            className={listItemClasses.button}
          >
            Dashboard
          </Button>
        </ListItem>
        {loadingMediaItems && <CircularProgress />}
        {!loadingMediaItems &&
          items.map((item) => (
            <ListItem key={item.filePath} className={listItemClasses.nested}>
              <Button
                component={CustomRouterLink}
                to={`/inst/met/file/${encodeURIComponent(item.filePath)}`}
                activeClassName={listItemClasses.active}
                className={listItemClasses.button}
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
            exact
            component={CustomRouterLink}
            to={`/inst/met/settings`}
            activeClassName={listItemClasses.active}
            className={listItemClasses.button}
          >
            Settings
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
