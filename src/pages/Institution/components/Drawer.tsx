import React from 'react'
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMediaItemsList } from "../../../api/hook";
import { useStyles } from "../styles";


interface DrawerProps {
  open: boolean
  onClose: () => void,
  drawerWidth: number
}

const InstDrawer = ({ open, onClose, drawerWidth }: DrawerProps) => {
  const classes = useStyles({ drawerWidth });
  const { data: items, loading: loadingMediaItems } = useMediaItemsList();

  return (
    <Drawer
    variant="permanent"
    classes={{
      paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={onClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      {loadingMediaItems && <CircularProgress />}
      {!loadingMediaItems &&
        items.map((item) => (
          <ListItem key={item.filePath} button>
            <NavLink to={`/inst/met/file?filePath=${item.filePath}`}>
              <ListItemText primary={item.title} />
            </NavLink>
          </ListItem>
        ))}
    </List>
    <Divider />
  </Drawer>
  )
}

export default InstDrawer;
