import React, { useState } from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import { useStats, useMediaItemsList } from "../../api/hook";
import InstDrawer from "./components/Drawer";
import ItemsTable from "./components/ItemsTable";
import WeekChart from "./components/WeekChart";
import WeekTotal from "./components/WeekTotal";

export default function InstitutionDashboard() {
  const drawerWidth = 240;
  const classes = useStyles({ drawerWidth });
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { data: items } = useMediaItemsList();
  const { data: stats } = useStats(items);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpen(true)}
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Met Museum
          </Typography>
        </Toolbar>
      </AppBar>
      <InstDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} drawerWidth={drawerWidth} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <WeekChart stats={stats} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <WeekTotal stats={stats} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ItemsTable stats={stats} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://www.wikipedia.org/">
                Wikimedia GLAM Dashboard
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
}
